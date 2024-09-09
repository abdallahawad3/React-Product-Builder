interface IProps {
  url: string;
  alt: string;
  classes: string;
}

const Image = ({ alt, url, classes }: IProps) => {
  return <img src={url} alt={alt} className={classes} />;
};

export default Image;
