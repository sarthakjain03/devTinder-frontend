const UserCard = ({ userDetails }) => {
  return (
    <div className="card bg-base-200 w-96 shadow">
      <figure>
        <img src={userDetails?.photoUrl} alt="User Display Picture" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{userDetails?.name}</h2>
        {userDetails?.age && userDetails?.gender && (
          <p>{userDetails?.age + ", " + userDetails?.gender}</p>
        )}
        <div className="flex gap-4 flex-wrap">
          {userDetails?.skills?.map((skill, index) => (
            <div
              key={`${skill}-${index}`}
              className="bg-base-300 shadow-md rounded py-2 px-3 max-w-fit"
            >
              {skill}
            </div>
          ))}
        </div>
        <div className="card-actions justify-center my-2">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
