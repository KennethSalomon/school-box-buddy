export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'food' | 'dessert' | 'drink';
  tag?: string;
}

export const menuItems: MenuItem[] = [
  { id: '1', name: 'Brochettes de Crevettes Grillées', description: 'Crevettes marinées aux épices tropicales, servies avec sauce mangue-passion', price: 8500, category: 'food', tag: 'Populaire' },
  { id: '2', name: 'Fish & Chips Tropical', description: 'Filet de capitaine pané, frites de patate douce, coleslaw maison', price: 6500, category: 'food' },
  { id: '3', name: 'Poulet Yassa', description: 'Poulet grillé, oignons caramélisés, citron confit, riz basmati', price: 5500, category: 'food' },
  { id: '4', name: 'Salade Ocean Breeze', description: 'Poulpe grillé, avocat, tomates cerises, vinaigrette agrumes', price: 7000, category: 'food', tag: 'Nouveau' },
  { id: '5', name: 'Burger SUNSET', description: 'Steak angus, cheddar fumé, oignons caramélisés, sauce barbecue maison', price: 7500, category: 'food' },
  { id: '6', name: 'Fondant au Chocolat', description: 'Cœur coulant, glace vanille bourbon, éclats de cacao', price: 4500, category: 'dessert' },
  { id: '7', name: 'Ananas Rôti', description: 'Ananas Victoria caramélisé, sorbet coco, crumble speculoos', price: 3500, category: 'dessert', tag: 'Populaire' },
  { id: '8', name: 'Tiramisu Passion', description: 'Version tropicale au fruit de la passion et biscuit coco', price: 4000, category: 'dessert' },
  { id: '9', name: 'Crème Brûlée Mangue', description: 'Crème onctueuse infusée à la mangue fraîche, caramel croustillant', price: 3800, category: 'dessert' },
  { id: '10', name: 'Sunset Spritz', description: 'Aperol, prosecco, jus d\'orange sanguine, eau pétillante', price: 5000, category: 'drink', tag: 'Signature' },
  { id: '11', name: 'Mojito Tropical', description: 'Rhum blanc, citron vert, menthe fraîche, sucre de canne, soda', price: 4500, category: 'drink' },
  { id: '12', name: 'Virgin Colada', description: 'Lait de coco, ananas frais, sirop de vanille, glace pilée', price: 3000, category: 'drink' },
  { id: '13', name: 'Jus Detox Green', description: 'Concombre, pomme verte, gingembre, menthe, citron', price: 2500, category: 'drink' },
  { id: '14', name: 'Margarita Coco', description: 'Tequila, lait de coco, citron vert, sel de mer fumé', price: 5500, category: 'drink', tag: 'Nouveau' },
];

export const testimonials = [
  { name: 'Aïcha D.', text: 'Un cadre paradisiaque et des cocktails divins. Le feu de camp du dimanche est devenu notre rituel !', rating: 5 },
  { name: 'Marc L.', text: 'Les brochettes de crevettes sont un pur délice. Le staff est aux petits soins. On reviendra !', rating: 5 },
  { name: 'Sophie K.', text: 'Ambiance magique au coucher du soleil. La meilleure adresse pour un dîner les pieds dans le sable.', rating: 5 },
  { name: 'Yves T.', text: 'Le Sunset Spritz est une tuerie. Le DJ du dimanche met une ambiance de folie. Incontournable !', rating: 4 },
];

export const events = [
  { id: '1', title: 'Feu de Joie du Dimanche', description: 'Tous les dimanches de 17h à 23h — musique live, grillades et marshmallows autour du feu.', date: 'Chaque dimanche', recurring: true },
  { id: '2', title: 'Soirée DJ Tropical', description: 'Mix house & afrobeats avec DJ Kwamé. Cocktails signature à prix réduit.', date: 'Vendredi 28 Février', recurring: false },
  { id: '3', title: 'Brunch du Samedi', description: 'Buffet brunch illimité avec vue sur l\'océan. Réservation recommandée.', date: 'Samedi 1er Mars', recurring: false },
  { id: '4', title: 'Sunset Yoga', description: 'Session yoga au coucher du soleil suivi d\'un smoothie offert.', date: 'Mercredi 26 Février', recurring: false },
];
