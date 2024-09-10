interface IProps {
  msg: string;
}

const MessageError = ({ msg }: IProps) => {
  return <span className="text-red-500 mt-1 font-medium text-sm">{msg}</span>;
};

export default MessageError;
