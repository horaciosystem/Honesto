import RoundedImage from "@/common/RoundedImage";
import useUsersList from "@/common/useUsersList";

function ShareFeedBack() {
  const { data: users } = useUsersList();

  return (
    <>
      {!users && <span>Loading...</span>}
      <ul hidden={!users}>
        {users?.map((user) => (
          <li key={user.id} className="grid grid-cols-3">
            <RoundedImage
              src={user.avatar}
              alt={`${user.firstName}'s avatar`}
            />
            <div>{`${user.firstName} ${user.lastName}`}</div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ShareFeedBack;
