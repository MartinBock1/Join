export interface Task {
  id?: string;
  title: string;
  description?: string;
  assignedTo?: string[];
  date: string;
  prio: 'Urgent' | 'Medium' | 'Low';
  category: 'User Story' | 'Technical Task';
  subtasks?: {text:string, IsCompleted: boolean}[];  
}
