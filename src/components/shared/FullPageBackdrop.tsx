type Props = {
    children: React.ReactNode
}
const FullPageBackdrop: React.FC<Props> = ({ children }) => {
    return <div className="full-page-backdrop">{children}</div>;
};

export default FullPageBackdrop;