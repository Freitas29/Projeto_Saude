<template>
    <li :class="['message', type, classSelection]" @click="handleSelection">
        <p v-if="!isLoading">{{ text }}</p>
        <i :class="text" v-if="isLoading"/>
    </li>
</template>

<script>
export default {
    name: "ChatbotMessage",
    props: {
        text: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: () => "answer"
        },
        isLoading: {
            type: Boolean,
            default: false
        },
        selection: {
            type: [ Boolean, Function ]
        }
    },
    methods: {
        handleSelection() {
            if(this.selection){
                this.selection(this.text)
            }
        }
    },
    computed: {
        classSelection() {
            return this.selection ? "selection" : ""
        }
        
    }
}
</script>

<style lang="scss" scoped>
$weight: bold;
$question-color: #2A7AE4;
$question-font-color: #F5F7FB;
$selection-color: #F5F7FB;
$selection-font-color: #2A7AE4;

.message {
    width: 80%;
    padding: 10px;
    background-color: #02C39A;
    color: #F5F7FB;
    border-radius: 6px;
    margin: 5px 0;
    position: absolute;
    display: flex;

    p {
        font-family: 'Balsamiq Sans', cursive;
        font-weight: $weight;
        font-size: 14px;
        white-space: pre-line;
    }
}

.answer {
    position: relative;
    left: 0;
}

.question {
    position: relative;
    right: 0;
    float: right;
    background-color: $question-color;
    color: $question-font-color;
}

.selection {
    width: fit-content;
    cursor: pointer;
    color: $selection-font-color;
    background-color: $selection-color;
    transition: all 0.5s;

    &:hover {
        transform: scale(1.1);
    }
}
</style>