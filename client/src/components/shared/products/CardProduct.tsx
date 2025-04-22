type CardProductProps = {
  title: string;
  images: { url: string }[];
  price: string;
};

const CardProduct = ({ title, images, price }: CardProductProps) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white">
      {images?.[0]?.url && (
        <img src={images[0].url} alt={title} className="w-full" />
      )}
      <div className="px-6 pt-12 pb-4 font-bold text-xl ">
        <h3>{title}</h3>
        <p>${price}</p>
      </div>
    </div>
  );
};

export default CardProduct;
