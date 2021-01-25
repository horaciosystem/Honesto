import useUsersList from "@/common/useUsersList";

function ShareFeedBack() {
  const { data, error } = useUsersList();
  console.log(data);

  return (
    <ul>
      <li></li>
    </ul>
  );
}

export default ShareFeedBack;
