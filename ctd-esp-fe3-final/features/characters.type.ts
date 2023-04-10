type Images = {
  path: string;
  extension: string;
};

export type Character = {
  character:any,
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  images: Images[];
  resourceURI: string;
  comics: {
    available: number;
    collectionURI: string;
    items: [];
    returned: number;
  };
  series: {
    available: number;
    collectionURI: string;
    items: [];
    returned: number;
  };
  stories: {
    available: number;
    collectionURI: string;
    items: [];
    returned: number;
  };
  events: {
    available: number;
    collectionURI: string;
    items: [];
    returned: number;
  };
  urls: [];
};
