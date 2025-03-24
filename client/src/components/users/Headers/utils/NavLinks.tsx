interface NavLinksProps {
    sections: string[];
    className?: string;
  }
  
  const NavLinks: React.FC<NavLinksProps> = ({ sections, className }) => {
    return (
      <div className={className}>
        {sections.map((name, index) => (
          <a key={index} href="#" className="hover:text-gray-400">
            {name}
          </a>
        ))}
      </div>
    );
  };
  
  export default NavLinks;
  