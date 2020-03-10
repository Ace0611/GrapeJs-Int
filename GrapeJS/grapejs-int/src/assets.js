//when you double click on image in your canvas
export const assets = {
  assets: [
    "http://placehold.it/350x250/78c5d6/fff/image1.jpg",
    // Pass an object with your properties
    {
      type: "image",
      src: "http://placehold.it/350x250/459ba8/fff/image2.jpg",
      height: 350,
      width: 250
    },
    {
      // As the 'image' is the base type of assets, omitting it will
      // be set as `image` by default
      src: "http://placehold.it/350x250/79c267/fff/image3.jpg",
      height: 350,
      width: 250
    }
  ]
};
