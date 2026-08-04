# Adding Techniques

Put techniques in `database/techniques.js`. Required fields are `id`, `name`, `source`, `spoilerEra`, `category`, `parentDisciplineIds`, `requirements`, `costs`, `combatTags`, `unlockRoutes`, and `advancedFromIds`.

The career engine checks technique data rather than hardcoded names. A parent route must be real, every requirement must be bounded, and an advanced state is never unlocked merely by training experience.
