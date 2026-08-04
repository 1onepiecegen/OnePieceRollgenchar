# Adding Mentors

Add a mentor to `database/mentors.js` only when teaching is plausible. A mentor is separate from a character reference. The normalizer supplies `profileId`, `characterId`, `teachingTags`, `teachableFoundationIds`, `teachableDisciplineIds`, `teachableTechniqueIds`, `requirements`, `limitations`, `trainingStyle`, and `availabilityTags`.

Use the same stable ID as the linked character only when the character record exists. Do not invent canon mentor chains. Uncertain simulator relationships must be `source:'expanded'` or `source:'fan'` and explicitly described as such.

Career mentor searches create a temporary relationship in `careerProgression.temporaryMentorHistory`; they do not rewrite the character's original mentor identity.
