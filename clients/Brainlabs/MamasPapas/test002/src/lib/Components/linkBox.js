export const linkBox = (ID) => {
  const html = `
  <div class="shg-c ${ID}__linkBox">
  <div class="csc-button-linkblock csc-button-linkblock-mobile-2-col csc-full-width">
    <a href="/collections/baby-clothing" class="ql-clothing buttonColor btn btn--secondary"
      >Clothing</a
    >
    
    <a href="/collections/furniture" class="ql-furniture buttonColor btn btn--secondary"
      >Furniture</a
    >
    
    <a href="/collections/pushchairs" class="ql-pushchair buttonColor btn btn--secondary"
      >Pushchairs</a
    >
    <a href="/collections/baby-monitors" class="ql-monitors buttonColor btn btn--secondary"
      >Baby Monitors</a
    >
    <a href="/collections/nursery" class="ql-nursery buttonColor btn btn--secondary"
      >Bedding &amp; Décor</a
    >
    <a href="/collections/bathing-changing" class="ql-bathing buttonColor btn btn--secondary"
      >Bathing &amp; Changing</a
    >
    <a href="/collections/feeding-weaning" class="ql-feeding buttonColor btn btn--secondary"
      >Feeding &amp; Weaning</a
    >
    <a href="/collections/toys-gifts" class="ql-toys buttonColor btn btn--secondary"
      >Toys &amp; Gifts</a
    >
   
  </div>
</div>
    `;

  return html.trim();
};
