const productItems = [

  { name: 'Beta Alanine', servings: 20 },
  { name: 'Vit C', servings: 0.15 },
  { name: 'Taurine', servings: 11 },
    { name: 'Calcium Silicate', servings: 0.03 },
  { name: 'Silicon Dioxide', servings: 0.04 },
  { name: 'Sucralose', servings: 0.1 },
  { name: 'Ace K', servings: 10.05 },
  { name: 'Color', servings: 0.001 },
  { PackagingName: '19 oz Pet Black Bottle', },
  { PackagingName: '01 Silica (10gm)',  },
  { PackagingName: 'Scoop 7.5cc', },
  { PackagingName: '89mm Pole Cap',  },
  { PackagingName: 'Carton 19oz - 12pk',},
];
module.exports = {
  getProductItems: () => productItems,
};


