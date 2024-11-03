<template>
  <div class="call-summary frame" v-if="lastCall">
    <h2>Call Summary</h2>
    <p class="call-number">{{ lastCall.number }}</p>
    <p class="call-status">{{ lastCall.status }}</p>
    <p class="call-start-time">Start Time: {{ formatTime(lastCall.startTime) }}</p>
    <p class="call-end-time">End Time: {{ endTime ? formatTime(endTime) : 'N/A' }}</p>
    <p class="call-duration" style="margin-bottom: 250px;">Duration: {{ formatDuration(duration) }}</p> <!-- Adjust margin here -->
    <div class="button-container">
      <button @click="endCall" class="end-call-button">End Call</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CallSummary',
  props: {
    lastCall: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      duration: 0,
      endTime: null,
      timer: null,
      isCallActive: false,
    };
  },
  watch: {
    lastCall: {
      immediate: true,
      handler(newCall) {
        if (newCall && newCall.status === 'Accepted') {
          this.startCall();
        } else if (newCall && newCall.status !== 'Accepted') {
          this.endCall(false);
        }
      },
    },
  },
  methods: {
    startCall() {
      this.isCallActive = true;
      this.duration = this.duration; // Keep existing duration
      this.startTimer(); // Start the duration timer
    },
    startTimer() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (this.isCallActive) {
          this.duration++;
        }
      }, 1000);
    },
    formatTime(date) {
      return date ? new Date(date).toLocaleTimeString() : 'N/A';
    },
    formatDuration(durationInSeconds) {
      const hours = String(Math.floor(durationInSeconds / 3600)).padStart(2, '0');
      const minutes = String(Math.floor((durationInSeconds % 3600) / 60)).padStart(2, '0');
      const seconds = String(durationInSeconds % 60).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    },
    endCall(shouldReset = true) {
      if (this.isCallActive) {
        this.endTime = new Date();
        clearInterval(this.timer);
        this.isCallActive = false;
        this.lastCall.status = 'Ended';
        this.$emit('call-ended', { ...this.lastCall, endTime: this.endTime, duration: this.duration });
      }

      if (shouldReset) {
        this.resetCallDetails();
      }
    },
    resetCallDetails() {
      this.duration = 0;
      this.endTime = null;
      this.isCallActive = false;
      clearInterval(this.timer);
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
.call-summary {
  margin: 20px 0;
  background-color: #333;
  padding: 20px;
  border-radius: 10px;
  height: auto;
  width: 300px;
  text-align: center;
}

.call-number,
.call-status,
.call-start-time,
.call-end-time,
.call-duration {
  margin: 5px 0;
}

.call-number {
  font-weight: bold;
  font-size: 24px;
}

.call-status {
  font-size: 18px;
}

.call-duration {
  margin-bottom: 20px; 
}

.button-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.end-call-button {
  background-color: red;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.end-call-button:hover {
  background-color: darkred;
}
</style>
