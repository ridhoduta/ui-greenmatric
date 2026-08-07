const fs = require('fs');
const path = require('path');

const categories = ['ec', 'ws', 'wr', 'tr', 'ed', 'gd'];

categories.forEach(cat => {
  const filePath = path.join(__dirname, 'src', 'app', '(dashboard)', 'categories', cat, 'page.tsx');
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace import
  content = content.replace(
    "import type { CategoryCode } from '@/types';",
    "import { useState } from 'react';\nimport type { CategoryCode, Indicator } from '@/types';"
  );

  // Replace component state hook
  const stateOldPattern = `export default function Category${cat.toUpperCase()}Page() {
  const { user } = useAuth();
  const { data, isLoading, error, refetch } = useCategoryIndicators(CATEGORY_CODE);

  const config = getCategoryConfig(CATEGORY_CODE)!;`;

  const stateNewPattern = `export default function Category${cat.toUpperCase()}Page() {
  const { user } = useAuth();
  const { data, isLoading, error, refetch } = useCategoryIndicators(CATEGORY_CODE);
  const [draftIndicator, setDraftIndicator] = useState<Indicator | null>(null);

  const config = getCategoryConfig(CATEGORY_CODE)!;`;

  content = content.replace(stateOldPattern, stateNewPattern);

  // Replace return block
  const returnOldBlock = `  return (
    <CategoryPageShell config={config} role={user.role} earnedPoints={earnedPoints}>
      <div className="space-y-3">
        {indicators.length === 0 ? (
          <div className="text-center py-16 text-sm text-on-surface-variant">
            Tidak ada indikator ditemukan.
          </div>
        ) : (
          indicators.map((indicator) =>
            isSuperAdmin ? (
              <IndicatorCardSuperAdmin
                key={indicator.id}
                indicator={indicator}
                categoryCode={CATEGORY_CODE}
                onUpdate={() => refetch()}
                onDelete={() => refetch()}
              />
            ) : isOperator ? (
              <IndicatorCardOperator
                key={indicator.id}
                indicator={indicator}
                categoryCode={CATEGORY_CODE}
                assessmentYear={ASSESSMENT_YEAR}
              />
            ) : (
              <IndicatorCardReadonly key={indicator.id} indicator={indicator} />
            )
          )
        )}
      </div>
    </CategoryPageShell>
  );`;

  const returnNewBlock = `  return (
    <CategoryPageShell config={config} role={user.role} earnedPoints={earnedPoints}>
      <div className="space-y-4">
        {isSuperAdmin && !draftIndicator && (
          <button
            onClick={() =>
              setDraftIndicator({
                id: 0,
                category_id: 0,
                code: '',
                title: '',
                input_type: 'NUMERIC_FORMULA',
                max_points: 0,
                fields: [
                  {
                    id: 0,
                    indicator_id: 0,
                    key: '',
                    label: '',
                    type: 'int',
                    required: true,
                  },
                ],
              })
            }
            className="w-full py-3 border-2 border-dashed border-primary/45 rounded-xl font-bold text-sm text-primary hover:bg-primary/5 hover:border-primary transition-all flex items-center justify-center gap-1.5"
          >
            + Tambah Indikator Baru
          </button>
        )}

        {draftIndicator && (
          <IndicatorCardSuperAdmin
            indicator={draftIndicator}
            categoryCode={CATEGORY_CODE}
            onUpdate={() => {
              refetch();
              setDraftIndicator(null);
            }}
            onDelete={() => setDraftIndicator(null)}
          />
        )}

        {indicators.length === 0 && !draftIndicator ? (
          <div className="text-center py-16 text-sm text-on-surface-variant">
            Tidak ada indikator ditemukan.
          </div>
        ) : (
          indicators.map((indicator) =>
            isSuperAdmin ? (
              <IndicatorCardSuperAdmin
                key={indicator.id}
                indicator={indicator}
                categoryCode={CATEGORY_CODE}
                onUpdate={() => refetch()}
                onDelete={() => refetch()}
              />
            ) : isOperator ? (
              <IndicatorCardOperator
                key={indicator.id}
                indicator={indicator}
                categoryCode={CATEGORY_CODE}
                assessmentYear={ASSESSMENT_YEAR}
              />
            ) : (
              <IndicatorCardReadonly key={indicator.id} indicator={indicator} />
            )
          )
        )}
      </div>
    </CategoryPageShell>
  );`;

  content = content.replace(returnOldBlock, returnNewBlock);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${cat}/page.tsx successfully`);
});
