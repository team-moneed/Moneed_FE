interface SelectProfileImageProps {
    onSelect: (img: string) => void;
}

const SelectProfileImage = ({ onSelect }: SelectProfileImageProps) => {
    const profileImages = Array.from({ length: 15 }, (_, i) => `/profile/profile-${i + 1}.svg`);

    return (
        <div className='grid grid-cols-4 gap-4 p-8 mt-16'>
            {profileImages.map((img, index) => (
                <img
                    key={index}
                    src={img}
                    alt={`Profile ${index + 1}`}
                    className='w-24 h-24 object-cover rounded-full cursor-pointer border border-solid border-moneed-gray-4 hover:border-moneed-brand'
                    onClick={() => onSelect(img)}
                />
            ))}
        </div>
    );
};

export default SelectProfileImage;
