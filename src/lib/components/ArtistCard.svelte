<script>
  export let author;
</script>

<div class="card bg-base-100 w-96 shadow-xl">
  <figure>
    <img src={author.pic} alt={author.surname} />
  </figure>
  <div class="card-body">
    <h2 class="card-title">{author.name} {author.surname}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
