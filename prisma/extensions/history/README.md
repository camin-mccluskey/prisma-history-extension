# Prisma History Extension

What does a good devex look like for this extension?
 1. I should be able to initalize the extension with a single line of code
 2. I should have a minimal config where most things are sensible defaults (we can think about overrides per model/field later)
 3. I should have type safety at the config level - it should be impossible to make a mistake in the config
 4. I should have confidence that when I update my schema, the extension will either:
     - continue to work as expected
     - break at *complication time* with a helpful error message

Ideal API:
 export const prisma = new PrismaClient().$extends(addHistory(config))

Ideal config:
```
 const config = {
   tracking: {
      user: {
        name: {
            status: 'active',
            historyKey: HistoryKey,
        },
      },
      task: {
        status: {
          status: 'active',
            historyKey: HistoryKey,
        },
        name: {
          status: 'inactive',
          historyKey: HistoryKey,
        },
      },
   },
 }
```

 How do we avoid mistakes in the config?
 - mistake 1: I mess up the model or field name - the type system should catch this
 - mistake 2: I mess up a key name - the type system should catch this
 - mistake 3: I duplicate a key - the type system WONT catch this, but the config is prevalidated and the extension will not start
 - mistake 4: I duplicate a key that is no longer in use. See (3) HOWEVER this relies on us ensuring we don't reuse keys. That is what the status field is for
    N.b: this makes me think we should use key values that have some semantic meaning. This would make detecting a duplicate key easier.

 What are the workflows:
 1. I want to bring a new field under history tacking
 2. I want to stop tracking a field
 3. I want to query for the history of a field - I therefore need to grab the records matching the key value

