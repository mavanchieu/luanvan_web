<template>
  <div class="range-slider">
    <label for="range">Price Range:</label>
    <div class="slider-container">
      <input type="range" id="range-min" class="range-input" :min="min" :max="max" :value="minValue"
        @input="updateMinValue" />
      <input type="range" id="range-max" class="range-input" :min="min" :max="max" :value="maxValue"
        @input="updateMaxValue" />
      <div class="slider-track"></div>
      <div class="slider-range" :style="rangeStyle"></div>
      <div class="slider-handle" :style="minHandleStyle"></div>
      <div class="slider-handle" :style="maxHandleStyle"></div>
    </div>
    <div class="values">
      <span>Min: {{ minValue }}</span>
      <span>Max: {{ maxValue }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    minValue: {
      type: Number,
      default: 0
    },
    maxValue: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    }
  },
  methods: {
    updateMinValue(event) {
      const value = Math.min(Number(event.target.value), this.maxValue - 1);
      this.$emit('update:minValue', value);
    },
    updateMaxValue(event) {
      const value = Math.max(Number(event.target.value), this.minValue + 1);
      this.$emit('update:maxValue', value);
    }
  },
  computed: {
    rangeStyle() {
      const percentageMin = ((this.minValue - this.min) / (this.max - this.min)) * 100;
      const percentageMax = ((this.maxValue - this.min) / (this.max - this.min)) * 100;
      return {
        left: `${percentageMin}%`,
        width: `${percentageMax - percentageMin}%`
      };
    },
    minHandleStyle() {
      const percentage = ((this.minValue - this.min) / (this.max - this.min)) * 100;
      return { left: `${percentage}%` };
    },
    maxHandleStyle() {
      const percentage = ((this.maxValue - this.min) / (this.max - this.min)) * 100;
      return { left: `${percentage}%` };
    }
  }
};
</script>

<style scoped>
.range-slider {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
}

.slider-container {
  position: relative;
  width: 100%;
  height: 50px;
}

.range-input {
  position: absolute;
  width: 100%;
  background: transparent;
  pointer-events: none;
}

.slider-track {
  position: absolute;
  width: 100%;
  height: 6px;
  background: #ddd;
  top: 50%;
  transform: translateY(-50%);
}

.slider-range {
  position: absolute;
  height: 6px;
  background: #007bff;
  top: 50%;
  transform: translateY(-50%);
}

.slider-handle {
  position: absolute;
  width: 16px;
  height: 16px;
  background: #007bff;
  border-radius: 50%;
  cursor: pointer;
  top: 50%;
  transform: translateY(-50%);
}

.values {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 14px;
}
</style>