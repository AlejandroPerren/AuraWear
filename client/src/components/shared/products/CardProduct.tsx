type CardProductProps = {
  title: string;
  images: { url: string }[]; 
  price: string;
};

const CardProduct = ({ title, images, price }: CardProductProps) => {
  return (
    <div className="">
      {images?.[0]?.url && <img src={images[0].url} alt={title} />}
      <p>{price}</p>
      <h3>{title}</h3>
    </div>
  );
};

export default CardProduct;
