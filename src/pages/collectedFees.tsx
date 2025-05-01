import { useCollectedFees } from "../hooks/useCollectedFeesHook";

function Collectefees() {
  const { collectedFees } = useCollectedFees();
  console.log("collected fees", collectedFees);
  return (
    <div>
      <h1>Collected Fees</h1>
      <p>This is the collected fees page.</p>
    </div>
  );
}

export default Collectefees;
