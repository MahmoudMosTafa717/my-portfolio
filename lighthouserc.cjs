/**
 * Lighthouse CI configuration — Core Web Vitals budgets for production build.
 *
 * Enforces Google's mobile "good" CWV thresholds:
 *   - Largest Contentful Paint (LCP) <= 2500 ms
 *   - Cumulative Layout Shift (CLS)  <= 0.1
 *   - Total Blocking Time (TBT)      <= 200 ms
 */

const LCP_BUDGET_MS = 2500; // good
const TBT_BUDGET_MS = 200;  // good (lab proxy for INP)
const CLS_BUDGET = 0.1;     // good

module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      numberOfRuns: 3,
      settings: {
        preset: process.env.LHCI_FORM_FACTOR === 'desktop' ? 'desktop' : undefined,
        onlyCategories: [
          'performance',
          'seo',
          'accessibility',
          'best-practices',
        ],
      },
    },
    assert: {
      aggregationMethod: 'median-run',
      assertions: {
        'largest-contentful-paint': ['error', { maxNumericValue: LCP_BUDGET_MS }],
        'cumulative-layout-shift': ['error', { maxNumericValue: CLS_BUDGET }],
        'total-blocking-time': ['error', { maxNumericValue: TBT_BUDGET_MS }],
        'categories:performance': ['error', { minScore: 0.90 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.90 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './.lighthouseci',
    },
  },
};
