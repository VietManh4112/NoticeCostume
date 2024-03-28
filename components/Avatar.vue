<template>
    <nuxt-link :to="'/ethnic/' + role">
        <svg preserveAspectRatio='none' data-bbox='-4 -10 160 160' viewBox='-4 -10 160 160' height='160' width='160'
            xmlns='http://www.w3.org/2000/svg' data-type='shape'>
            <defs>
              <clipPath id="circleClip">
                <circle cx="76" cy="70" r="80" />
              </clipPath>
            </defs>
            <rect x="-4" y="-10" width="160" height="160" fill="rgba(249,220,200,255)" clip-path="url(#circleClip)" />
            <g clip-path="url(#circleClip)">
              <image
                :xlink:href="imageUrl" width="151" height="148" />
                
              <foreignObject x="16" y="98" width="160" height="30">
                <div xmlns="http://www.w3.org/1999/xhtml" class="image-caption">{{ role }}</div>
              </foreignObject>
            </g>
        </svg>
      </nuxt-link>
</template>

<script>
    export default {
        name: "Avatar",
        props: {
            imageUrl: String,
            role: String,
        },
    }
</script>

<style>
.image-caption {
  font-weight: 500;
}
</style>