import axios from 'axios';
import 'dotenv/config';

// Use the Voiceflow API Key from your environment variables
const VOICEFLOW_API_KEY = process.env.VOICEFLOW_API_KEY;

if (!VOICEFLOW_API_KEY) {
  throw new Error('VOICEFLOW_API_KEY is not defined. Please add it to your .env file.');
}

// Trigger a workflow in Voiceflow
export const triggerWorkflow = async (workflowId: string, userId: string) => {
  try {
    // Replace this with the correct Voiceflow API endpoint for triggering custom workflows
    const apiUrl = `https://general-runtime.voiceflow.com/state/${workflowId}/user/${userId}/interact`;

    // Prepare the payload or any necessary data to trigger the workflow
    const payload = {
      action: {
        type: 'custom', // custom action type for specific workflows
        payload: {
          workflowId, // Include the workflow ID
        },
      },
    };

    // Send the request to the Voiceflow DM API
    const response = await axios.post(apiUrl, payload, {
      headers: {
        Authorization: VOICEFLOW_API_KEY,
        'Content-Type': 'application/json',
      },
    });

    // Handle the response as necessary
    if (response.status === 200) {
      console.log(`Workflow ${workflowId} triggered successfully`);
    } else {
      console.error(`Failed to trigger workflow ${workflowId}`, response.data);
    }
  } catch (error) {
    console.error(`Error triggering workflow ${workflowId}`, error);
  }
};
