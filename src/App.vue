<template>
  <div id="app" class="app-container">
    <h1>VoIP Application</h1>
    <div class="controls-summary-container">
      <CallLog class="call-log" :calls="calls" />
      <CallControls class="call-controls" @call-started="logCall" />
      <CallSummary class="call-summary" :lastCall="lastCall" @call-ended="updateCall" />
    </div>
  </div>
</template>

<script>
import CallControls from './components/CallControls.vue';
import CallLog from './components/CallLog.vue';
import CallSummary from './components/CallSummary.vue';

export default {
  components: {
    CallControls,
    CallLog,
    CallSummary,
  },
  data() {
    return {
      calls: [],   // Array to store call records
      lastCall: null, // Store the last call's details
    };
  },
  methods: {
    // Logs the details of a new call
    logCall(call) {
      const statuses = ['Rejected', 'Missed', 'Accepted']; // Possible call statuses
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]; // Randomly select a status
      const callWithDetails = {
        number: call.number, // Replace with actual number being called
        startTime: new Date(), // Set the current time as the start time
        endTime: null, // Initialize endTime as null when the call starts
        status: randomStatus,
      };
      this.calls.push(callWithDetails); // Add call to calls array
      this.lastCall = callWithDetails; // Set lastCall to the current call
    },

    // Updates the details of a completed call
    updateCall(call) {
      // Find the index of the call to update
      const index = this.calls.findIndex(c => c.number === call.number && c.startTime.getTime() === call.startTime.getTime());
      if (index !== -1) {
        this.calls[index].endTime = new Date(); // Set the current time as the end time
        this.lastCall = this.calls[index]; // Update lastCall with the ending call details
      }
      console.log('Call updated:', this.calls[index]); // Log the updated call for debugging
    },
  },
};
</script>

<style>
@import './assets/styles.css';

.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Full viewport height for centering */
}

.controls-summary-container {
  display: flex; /* Flexbox for horizontal layout */
  justify-content: center; /* Center child components */
  gap: 50px; /* Space between child components */
}
</style>
