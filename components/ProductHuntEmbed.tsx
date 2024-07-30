import Link from "next/link";

const ProductHuntEmbed = () => {
  return (
    <Link
      href="https://www.producthunt.com/posts/jargonize?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-jargonize"
      target="_blank"
      className="mt-4 mb-4"
    >
      <img
        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=471323&theme=light"
        alt="Jargonize - Turning&#0032;Slangs&#0032;into&#0032;Suits&#0033; | Product Hunt"
        style={{
          width: "250px",
          height: "54px",
          float: "right",
          marginBottom: "25px",
        }}
      />
    </Link>
  );
};

export default ProductHuntEmbed;
