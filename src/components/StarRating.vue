<template>
  <div class="mt-2 text-left flex justify-center" role="img" aria-label="Book Rating">
    <div class="stars-outer" aria-hidden="true">
        <div class="stars-inner" :style="{ width: calculateWidth() }"></div>
    </div>
    <span class="number-rating" aria-hidden="true">{{ rating }}</span>
  </div>
</template>

<script>
 /**
   *  A component for displaying a star rating based on a number between 0 and 5
   */
export default {
  props: {
    // Define rating as a prop
    rating: {
      type: Number,
      required: true,
    }
  },
  computed: {
    // Computed property for stars total
    starsTotal() {
      return 5;
    }
  },
  methods: {
    calculateWidth() {
      const starPercentage = (this.rating / this.starsTotal) * 100;
      const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
      return starPercentageRounded;
    }
  }
};
</script>

<style>
.stars-outer {
  position: relative;
  display: inline-block;
}

.stars-inner {
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  overflow: hidden;
  width: 0;
}

.stars-outer::before {
  content: "\f005 \f005 \f005 \f005 \f005";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  color: #ccc;
}

.stars-inner::before {
  content: "\f005 \f005 \f005 \f005 \f005";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  color: #f8ce0b;
}
</style>
