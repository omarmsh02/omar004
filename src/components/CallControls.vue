<template>
    <div class="call-controls frame">
        <h2>Call Controls</h2>
        <div class="input-container">
            <input v-model="phoneNumber" class="phone-input" />
            <button @click="eraseLastDigit" class="erase-button">←</button>
        </div>
        <div class="dial-pad">
            <div class="number-row">
                <button @click="addNumber(1)">1</button>
                <button @click="addNumber(2)">2</button>
                <button @click="addNumber(3)">3</button>
            </div>
            <div class="number-row">
                <button @click="addNumber(4)">4</button>
                <button @click="addNumber(5)">5</button>
                <button @click="addNumber(6)">6</button>
            </div>
            <div class="number-row">
                <button @click="addNumber(7)">7</button>
                <button @click="addNumber(8)">8</button>
                <button @click="addNumber(9)">9</button>
            </div>
            <div class="number-row">
                <button @click="addNumber('*')">*</button>
                <button @click="addNumber(0)">0</button>
                <button @click="addNumber('#')">#</button>
            </div>
        </div>
        <button @click="makeCall" class="call-button">Call</button>
    </div>
</template>

<script>
export default {
    name: 'CallControls',
    data() {
        return {
            phoneNumber: '',
        };
    },
    methods: {
        // Initiates a call and emits the call info
        makeCall() {
            const callInfo = {
                number: this.phoneNumber,
                status: 'In Progress',
                startTime: new Date(),
            };
            this.$emit('call-started', callInfo);
            console.log(`Making call to: ${this.phoneNumber}`);
            this.phoneNumber = ''; // Reset input after making a call
        },
        
        // Appends the pressed number to the phone number
        addNumber(num) {
            this.phoneNumber += num; 
        },
        
        // Removes the last digit from the phone number
        eraseLastDigit() {
            this.phoneNumber = this.phoneNumber.slice(0, -1); 
        },
    },
};
</script>

<style scoped>
/* Styles for the call controls container */
.call-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    background-color: #333;
    padding: 20px;
    border-radius: 10px;
    height: 500px;
}

/* Styles for the input container */
.input-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Styles for the phone number input field */
.phone-input {
    width: 80%;
    height: 40px;
    font-size: 24px;
    color: white;
    background-color: transparent;
    border: none;
    outline: none;
    text-align: center;
    font-weight: bold;
}

/* Styles for the erase button */
.erase-button { 
    width: 60px; 
    height: 60px; 
    background-color: gray;
    color: white;
    border: none;
    font-size: 24px; 
    font-weight: bold; 
    cursor: pointer;
}

/* Hover effect for the erase button */
.erase-button:hover {
    background-color: #555;
    transform: scale(1.1);
}

/* Styles for the dial pad container */
.dial-pad {
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* Styles for each row of numbers in the dial pad */
.number-row {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}

/* General button styles */
button {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    background-color: gray;
    color: white;
    border: none;
    font-size: 24px;
    margin: 0 10px;
    font-weight: bold;
    transition: background-color 0.3s, transform 0.3s;
}

/* Hover effect for number buttons */
button:hover {
    background-color: #555;
    transform: scale(1.1);
}

/* Styles for the call button */
.call-button {
    background-color: green;
    width: 60px;
    height: 60px;
    margin-top: 20px;
    color: white;
    font-size: 18px;
    font-weight: normal;
    border-radius: 50%;
    border: none;
    transition: background-color 0.3s;
    padding: 0;
}

/* Hover effect for the call button */
.call-button:hover {
    background-color: darkgreen;
}
</style>
