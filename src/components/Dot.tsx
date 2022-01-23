interface DotProps {
    color: string;
}

const Dot = ({color}: DotProps) => {
    return (
        <div className="dot" style={{ backgroundColor: color }}></div>
    );
};

export default Dot;