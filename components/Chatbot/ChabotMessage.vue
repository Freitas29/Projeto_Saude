<template>
    <li :class="['message', type]">
        <p>{{ text }}</p>
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
        }
    }
}
</script>

<style lang="scss" scoped>
$weight: bold;
$question-color: #2A7AE4;
$question-font-color: #F5F7FB;

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
</style>