interface obj {
  title: string;
  description: string;
  imageURL: string;
  price: string;
}

const productValidation = (obj: obj) => {
  const { title, description, imageURL, price } = obj;
  const errorObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };

  if (title.length == 0 || title.length < 10 || title.length > 50) {
    errorObj.title = "The title must be at least 10 character and max 50 character";
  }

  if (description.length == 0 || description.length < 30 || description.length > 80) {
    errorObj.description = "The description must be at least 30 character and max 80 character";
  }
  if (!Number(price) || price.length == 0) {
    errorObj.price = "You should enter valid price";
  }
  if (!imageURL.match(/^https?:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?$/)) {
    errorObj.imageURL = "Enter valid image url";
  }

  return errorObj;
};

export { productValidation };
