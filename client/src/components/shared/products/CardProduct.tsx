type CardProductProps = {
  title: string;
  images: { url: string }[];
  price: string;
  description: string
};

const CardProduct = ({ title, images, price, description }: CardProductProps) => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm bg-white border border-gray-200 hover:shadow-md transition-all duration-200 max-w-sm">
      {images?.[0]?.url && (
        <img
          src={images[0].url}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}
       <div className="p-4">
        <p className="text-gray-800 text-lg font-bold mt-2 ">{description}</p>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{title}</h3>
        <p className="text-sky-500 font-bold mt-2 text-base">${price}</p>
      </div>
    </div>
  );
};

export default CardProduct;
