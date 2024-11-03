<template>
  <div class="call-log frame">
    <h2 class="call-log-title">Call Log</h2>
    <div class="call-log-header">
      <div class="header-item">Status</div>
      <div class="header-item">Number</div>
      <div class="header-item">Start Time</div>
      <div class="header-item">End Time</div>
      <div class="header-item">Duration</div>
    </div>
    <div class="call-log-content">
      <ul>
        <li v-for="(call, index) in callLog" :key="index" class="call-log-entry">
          <div class="call-details">
            <div class="call-status">{{ call.status }}</div>
            <div class="call-number">{{ call.number }}</div>
            <div class="call-time">{{ formatTime(call.startTime) }}</div>
            <div class="call-end-time">{{ call.endTime ? formatTime(call.endTime) : 'N/A' }}</div>
            <div class="call-duration">{{ calculateDuration(call.startTime, call.endTime) }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CallLog',
  props: {
    calls: {
      type: Array,
      required: true,
    },
  },
  computed: {
    callLog() {
      return this.calls; // Use the calls prop for displaying call logs
    },
  },
  methods: {
    // Formats the given date into a readable time string
    formatTime(date) {
      return new Date(date).toLocaleTimeString(); // Formats time nicely
    },
    
    // Calculates the duration between startTime and endTime
    calculateDuration(startTime, endTime) {
      if (!endTime) return 'N/A'; // Return 'N/A' if endTime is not set
      const duration = Math.floor((new Date(endTime) - new Date(startTime)) / 1000); // Duration in seconds
      const hours = String(Math.floor(duration / 3600)).padStart(2, '0');
      const minutes = String(Math.floor((duration % 3600) / 60)).padStart(2, '0');
      const seconds = String(duration % 60).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`; // Format as hh:mm:ss
    },
  },
};
</script>

<style scoped>
.call-log {
  margin: 20px 0;
  background-color: #333;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  height: 500px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
}

/* Centering the title */
.call-log-title {
  text-align: center; /* Centers the text */
  color: white; /* Text color */
  margin-bottom: 20px; /* Space below the title */
}

.call-log-header {
  display: flex;
  background-color: #222;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  white-space: nowrap;
}

.header-item {
  flex: 1;
  text-align: center;
  min-width: 100px;
}

.call-log-content {
  flex: 1;
  overflow-y: auto;
}

.call-log-content::-webkit-scrollbar {
  width: 10px;
}

.call-log-content::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 5px;
}

.call-log-content::-webkit-scrollbar-track {
  background: #333;
}

.call-log ul {
  list-style-type: none;
  padding: 0;
}

.call-log-entry {
  background-color: #444;
  padding: 15px;
  border-radius: 5px;
  margin: 5px 0;
  transition: background-color 0.3s;
  white-space: nowrap;
}

.call-log-entry:hover {
  background-color: #555;
  cursor: pointer;
}

.call-details {
  display: flex;
  justify-content: space-between;
}

.call-status,
.call-number,
.call-time,
.call-end-time,
.call-duration {
  flex: 1;
  text-align: center;
  min-width: 100px;
}
</style>
