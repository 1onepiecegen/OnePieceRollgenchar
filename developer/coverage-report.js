/* V4.5 content coverage reporting. Read-only: it never changes generation. */
(function (V4) {
  'use strict';
  const coverage = V4.developer.coverage = V4.developer.coverage || {};
  const SOURCES = ['canon', 'sbs', 'movie', 'game', 'expanded', 'fan'];
  const sourceCounts = entries => Object.fromEntries(SOURCES.map(source => [source, entries.filter(entry => (entry.source || entry.src || 'expanded') === source).length]));
  const category = entries => ({ total: entries.length, sources: sourceCounts(entries) });
  coverage.report = function () {
    const styles = V4.database.catalog?.styles || V4.database.styles || [];
    return {
      databaseVersion: V4.database.manifest?.databaseVersion || 'unknown',
      categories: {
        mentors: category(V4.database.mentors || []),
        characterReferences: category(V4.database.characters || []),
        fruits: category(V4.database.fruits || []),
        weapons: category(V4.database.catalog?.weapons || V4.database.weapons || []),
        foundations: category(styles.filter(style => style.progressionType === 'foundation')),
        disciplines: category(styles.filter(style => style.progressionType === 'discipline')),
        techniques: category(styles.filter(style => style.progressionType === 'technique')),
        races: category(V4.database.races || []),
        traits: category(V4.database.traits || []),
        reputations: category(V4.database.reputations || []),
        accomplishments: category(V4.database.accomplishments || [])
      }
    };
  };
  coverage.format = function (report) {
    const header = 'Category'.padEnd(23) + 'Total'.padStart(7) + SOURCES.map(source => source.padStart(10)).join('');
    const rows = Object.entries(report.categories).map(([name, data]) =>
      name.padEnd(23) + String(data.total).padStart(7) + SOURCES.map(source => String(data.sources[source]).padStart(10)).join('')
    );
    return `=== V4.5 DATABASE COVERAGE ===\nDatabase version: ${report.databaseVersion}\n\n${header}\n${rows.join('\n')}\n\nMentor pool and character references are intentionally separate. Source labels describe content provenance; they do not change formulas.`;
  };
}(window.OnePieceRollV4));

