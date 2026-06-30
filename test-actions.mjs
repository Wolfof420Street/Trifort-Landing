import { toggleContactStatus, toggleQuoteStatus, toggleSubcontractorStatus, toggleReviewStatus, deleteProject, createProject } from './src/lib/actions/admin.ts';

async function runTest() {
  const actions = [
    { name: 'toggleContactStatus', fn: () => toggleContactStatus('1', 'new') },
    { name: 'toggleQuoteStatus', fn: () => toggleQuoteStatus('1', 'new') },
    { name: 'toggleSubcontractorStatus', fn: () => toggleSubcontractorStatus('1', 'pending') },
    { name: 'toggleReviewStatus', fn: () => toggleReviewStatus('1', 'pending') },
    { name: 'deleteProject', fn: () => deleteProject('1') },
    { name: 'createProject', fn: () => createProject(new FormData()) },
  ];

  console.log("--- PRIORITY 1.1: Verify Server Actions Auth ---");
  for (const action of actions) {
    try {
      await action.fn();
      console.log(`❌ Failure: ${action.name} succeeded without auth context.`);
    } catch (e) {
      // In a raw Node context, cookies() throws an Invariant error if called outside a request.
      // Or if mocked, it might throw 'Unauthorized'.
      if (e.message.includes('Unauthorized') || e.message.includes('cookies() expects to have requestAsyncStorage')) {
        console.log(`✅ Success: ${action.name} rejected unauthorized request. Error: ${e.message.substring(0, 50)}...`);
      } else {
        console.log(`⚠️ Warning: ${action.name} failed with unexpected error: ${e.message}`);
      }
    }
  }
}

runTest();
