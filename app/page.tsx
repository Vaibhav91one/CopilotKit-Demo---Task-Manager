"use client"

import TaskList from '@/components/self/TaskList';
import { CopilotKit } from "@copilotkit/react-core"; 
import { CopilotPopup } from "@copilotkit/react-ui"; 
import "@copilotkit/react-ui/styles.css"; 

function Home() {

  return (
    <CopilotKit runtimeUrl="/api/copilotkit">
    <div className='flex justify-center items-center my-10'>
      <div className='flex-col justify-center items-center gap-5'>
        <TaskList />
      </div>
    </div>
    <CopilotPopup/>
    </CopilotKit>
  );
}

export default Home;