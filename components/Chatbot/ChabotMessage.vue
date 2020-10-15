<template>
    <div :class="['message', type]">
        <p>{{ text }}</p>
    </div>
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
$weight: 600;
$question-color: #403D56;
$question-font-color: #F5F7FB;

.message {
    width: 80%;
    padding: 10px;
    background-color: #FFF;
    border-radius: 6px;
    margin: 5px 0;
    position: absolute;

    p {
        font-weight: $weight;
        font-size: 12px;
    }
}

.answer {
    position: relative;
    left: 0;
}

.question {
    position: relative;
    right: 0;
    background-color: $question-color;
    color: $question-font-color;
}
</style>