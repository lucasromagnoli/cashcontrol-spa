<template>
  <div>
    <transition-group name="message" tag="div">
      <v-alert
        v-for="message in messages"
        :key="message.key"
        :type="message.type"
        :dismissible="message.dismissible"
        ref="messageDisplay"
      >
        {{ parseMessage(message.text) }}
      </v-alert>
    </transition-group>
  </div>
</template>

<script>
import config from '@/core/config';

export default {
  name: 'MessageDisplay',
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    parseMessage(text) {
      if (typeof text === 'object') {
        let messages = '';
        Object.entries(text).forEach((array, arrayLoop) => {
          array.forEach((item, itemLoop) => {
            messages += item;
            if (item.length - 1 !== itemLoop) {
              messages += ': ';
            }
          });

          if (Object.entries(text).length - 1 !== arrayLoop) {
            messages += ';';
          }
        });
        return messages;
      }
      return text;
    },
    /* eslint-disable */
    insertMessage({ type, text, dismissible, time }) {
      // TODO(18/12/2020): Corrigir erro do eslint/prettier referente ao {
      /* eslint-enable */
      const message = {
        key: new Date().getTime(),
        type,
        text,
        dismissible: dismissible !== undefined ? dismissible : false,
      };

      this.messages.push(message);
      if (time !== undefined && Number.isInteger(time)) {
        setTimeout(() => {
          this.removeMessage(message);
        }, time);
      }
    },
    removeMessage({ key }) {
      this.messages = this.messages.filter((message) => message.key !== key);
    },
    clearMessages() {
      this.messages = [];
    },
  },
  mounted() {
    window.bus.$on(config.events.INSERT_MESSAGE, this.insertMessage);
    console.log('listening', config.events.INSERT_MESSAGE);
    window.bus.$on(config.events.CLEAR_MESSAGE, this.clearMessages);
    console.log('listening', config.events.CLEAR_MESSAGE);
  },
};
</script>

<style scoped>
.message {
  transition: all 0.5s;
}
.message-enter,
.message-leave-to {
  opacity: 0;
  transform: scale(0);
}
.message-enter-to {
  opacity: 1;
  transform: scale(1);
}

.message-move {
  opacity: 1;
  transition: all 0.5s;
}
</style>
