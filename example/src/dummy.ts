import randomColor from 'randomcolor';

const images = [
  'https://images.unsplash.com/photo-1592388607385-d2e38a371661?w=900',
  'https://images.unsplash.com/photo-1546975490-a79abdd54533?w=900',
  'https://images.unsplash.com/photo-1636915739119-1ef2fe0b87d2?w=900',
  'https://images.unsplash.com/photo-1536385318585-f6c37dffc3a7?w=900',
  'https://images.unsplash.com/photo-1573666083884-1d1c2f6b5cf6?w=900',
  'https://images.unsplash.com/photo-1634907287642-c682daafdc9b?w=900',
  'https://images.unsplash.com/photo-1635323333422-eeefc9a71281?w=900',
  'https://images.unsplash.com/photo-1632999860796-407f45372996?w=900',
  'https://images.unsplash.com/photo-1634293656518-eb142baef080?w=900',
  'https://i.imgur.com/t9ltkrk.jpg', // dont mess with him
];

export const generateDummy = (length: number, randomHeight?: boolean) =>
  Array(length)
    .fill(1)
    .map((_, index) => ({
      text: index,
      backgroundColor: randomColor(),
      image: images[index % 10],
      height: randomHeight ? Math.floor(Math.random() * 120 + 40) : 500,
    }));
