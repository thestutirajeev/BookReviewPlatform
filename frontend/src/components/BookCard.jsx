import { Link } from 'react-router-dom';

export default function BookCard({ book }) {
return (
  <div className="bg-white shadow-md border-t-4 border-[#FEB60D] rounded-2xl p-4 hover:shadow-xl transition-all duration-300  flex flex-col justify-between">
    <img
      src={
        book.coverImage ||
        'https://img.freepik.com/free-vector/bike-guy-wattpad-book-cover_23-2149452163.jpg?t=st=1750344662~exp=1750348262~hmac=256691593a92acb66671ff4eda14ebbacd6f312e754c4581f95494da29209932&w=1380'
      }
      alt={book.title}
      className="w-full h-64 object-cover rounded-xl mb-4"
    />

    <div className="flex justify-between items-start mb-2">
      <div>
        <h3 className="text-base font-semibold text-[#01B5C5]">{book.title}</h3>
        <p className="text-sm text-gray-700">by {book.author}</p>
      </div>
      <Link
        to={`/books/${book._id}`}
        className="w-[36px] h-[36px] rounded-full border border-[#01B5C5] flex items-center justify-center group hover:bg-[#01B5C5] transition mt-1"
      >
        <svg
          className="text-[#01B5C5] group-hover:text-white w-4 h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
    </div>

    <p className="text-sm text-yellow-600">⭐ {book.averageRating.toFixed(1)}</p>
  </div>
);

}
