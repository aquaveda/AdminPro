import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, MoreHorizontal, User, Calendar, MessageSquare, Paperclip, Edit, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface Task {
  id: number;
  title: string;
  description: string;
  column: string;
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
  comments: number;
  attachments: number;
  tags: string[];
}

const KanbanPage = () => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newTaskAssignee, setNewTaskAssignee] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [showNewTaskForm, setShowNewTaskForm] = useState<string | null>(null);
  const [showFullTaskDialog, setShowFullTaskDialog] = useState(false);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-100 dark:bg-gray-800' },
    { id: 'inprogress', title: 'In Progress', color: 'bg-blue-100 dark:bg-blue-900' },
    { id: 'review', title: 'In Review', color: 'bg-yellow-100 dark:bg-yellow-900' },
    { id: 'done', title: 'Done', color: 'bg-green-100 dark:bg-green-900' }
  ];

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Design new dashboard layout',
      description: 'Create wireframes and mockups for the new admin dashboard',
      column: 'todo',
      priority: 'high',
      assignee: 'John Doe',
      dueDate: '2024-06-20',
      comments: 3,
      attachments: 2,
      tags: ['Design', 'UI/UX']
    },
    {
      id: 2,
      title: 'Implement user authentication',
      description: 'Set up login, registration, and password reset functionality',
      column: 'inprogress',
      priority: 'high',
      assignee: 'Jane Smith',
      dueDate: '2024-06-18',
      comments: 5,
      attachments: 1,
      tags: ['Backend', 'Security']
    },
    {
      id: 3,
      title: 'Write API documentation',
      description: 'Document all REST API endpoints with examples',
      column: 'inprogress',
      priority: 'medium',
      assignee: 'Mike Johnson',
      dueDate: '2024-06-22',
      comments: 1,
      attachments: 0,
      tags: ['Documentation']
    },
    {
      id: 4,
      title: 'Set up CI/CD pipeline',
      description: 'Configure automated testing and deployment',
      column: 'review',
      priority: 'medium',
      assignee: 'Sarah Wilson',
      dueDate: '2024-06-15',
      comments: 2,
      attachments: 3,
      tags: ['DevOps', 'Automation']
    },
    {
      id: 5,
      title: 'Optimize database queries',
      description: 'Improve performance of slow database operations',
      column: 'done',
      priority: 'low',
      assignee: 'Tom Brown',
      dueDate: '2024-06-10',
      comments: 4,
      attachments: 1,
      tags: ['Database', 'Performance']
    },
    {
      id: 6,
      title: 'User testing sessions',
      description: 'Conduct usability testing with 10 participants',
      column: 'done',
      priority: 'high',
      assignee: 'Lisa Davis',
      dueDate: '2024-06-12',
      comments: 8,
      attachments: 5,
      tags: ['Testing', 'UX']
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getTagColor = (tag: string) => {
    const colors = [
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
      'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
      'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
    ];
    return colors[tag.length % colors.length];
  };

  const getTasksForColumn = (columnId: string) => {
    return tasks.filter(task => task.column === columnId);
  };

  const handleAddTask = (columnId: string) => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now(),
        title: newTaskTitle,
        description: newTaskDescription || 'No description provided',
        column: columnId,
        priority: newTaskPriority,
        assignee: newTaskAssignee || 'Unassigned',
        dueDate: newTaskDueDate || new Date().toISOString().split('T')[0],
        comments: 0,
        attachments: 0,
        tags: []
      };
      
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setNewTaskDescription('');
      setNewTaskPriority('medium');
      setNewTaskAssignee('');
      setNewTaskDueDate('');
      setShowNewTaskForm(null);
      
      toast({
        title: "Task Added",
        description: `"${newTask.title}" has been added to ${columns.find(col => col.id === columnId)?.title}`,
      });
    }
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast({
      title: "Task Deleted",
      description: "Task has been successfully deleted",
    });
  };

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    if (draggedTask && draggedTask.column !== columnId) {
      setTasks(tasks.map(task => 
        task.id === draggedTask.id 
          ? { ...task, column: columnId }
          : task
      ));
      
      toast({
        title: "Task Moved",
        description: `"${draggedTask.title}" moved to ${columns.find(col => col.id === columnId)?.title}`,
      });
    }
    setDraggedTask(null);
  };

  const handleCreateTaskFromHeader = () => {
    setShowFullTaskDialog(true);
  };

  const handleCreateFullTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now(),
        title: newTaskTitle,
        description: newTaskDescription || 'No description provided',
        column: 'todo',
        priority: newTaskPriority,
        assignee: newTaskAssignee || 'Unassigned',
        dueDate: newTaskDueDate || new Date().toISOString().split('T')[0],
        comments: 0,
        attachments: 0,
        tags: []
      };
      
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setNewTaskDescription('');
      setNewTaskPriority('medium');
      setNewTaskAssignee('');
      setNewTaskDueDate('');
      setShowFullTaskDialog(false);
      
      toast({
        title: "Task Created",
        description: `"${newTask.title}" has been added to To Do`,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Kanban Board</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Organize and track your project tasks visually.</p>
        </div>
        <Dialog open={showFullTaskDialog} onOpenChange={setShowFullTaskDialog}>
          <DialogTrigger asChild>
            <Button 
              className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
              onClick={handleCreateTaskFromHeader}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="task-title">Title</Label>
                <Input
                  id="task-title"
                  placeholder="Enter task title..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="task-description">Description</Label>
                <Textarea
                  id="task-description"
                  placeholder="Enter task description..."
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="task-priority">Priority</Label>
                <Select value={newTaskPriority} onValueChange={(value: 'low' | 'medium' | 'high') => setNewTaskPriority(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="task-assignee">Assignee</Label>
                <Input
                  id="task-assignee"
                  placeholder="Enter assignee name..."
                  value={newTaskAssignee}
                  onChange={(e) => setNewTaskAssignee(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="task-due-date">Due Date</Label>
                <Input
                  id="task-due-date"
                  type="date"
                  value={newTaskDueDate}
                  onChange={(e) => setNewTaskDueDate(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleCreateFullTask} className="flex-1">
                  Create Task
                </Button>
                <Button variant="outline" onClick={() => setShowFullTaskDialog(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map(column => {
          const columnTasks = getTasksForColumn(column.id);
          
          return (
            <div 
              key={column.id} 
              className="space-y-4"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {/* Column Header */}
              <Card className={`${column.color} border-gray-200 dark:border-gray-700`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-gray-900 dark:text-white text-lg">
                      {column.title}
                    </CardTitle>
                    <Badge variant="secondary" className="bg-white dark:bg-gray-800">
                      {columnTasks.length}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>

              {/* Tasks */}
              <div className="space-y-3">
                {columnTasks.map(task => (
                  <Card 
                    key={task.id} 
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200 cursor-move"
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                  >
                    <CardContent className="p-4">
                      {/* Task Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                            {task.title}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                            {task.description}
                          </p>
                        </div>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {task.tags.map(tag => (
                          <Badge key={tag} className={`text-xs ${getTagColor(tag)}`}>
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Priority */}
                      <div className="mb-3">
                        <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                          {task.priority} priority
                        </Badge>
                      </div>

                      {/* Task Footer */}
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            <span>{task.assignee.split(' ')[0]}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            <span>{task.dueDate}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {task.comments > 0 && (
                            <div className="flex items-center">
                              <MessageSquare className="w-3 h-3 mr-1" />
                              <span>{task.comments}</span>
                            </div>
                          )}
                          {task.attachments > 0 && (
                            <div className="flex items-center">
                              <Paperclip className="w-3 h-3 mr-1" />
                              <span>{task.attachments}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Add Task Button */}
                {showNewTaskForm === column.id ? (
                  <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardContent className="p-4">
                      <Input
                        placeholder="Enter task title..."
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        className="mb-3"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddTask(column.id)}
                      />
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleAddTask(column.id)}
                          className="bg-gradient-to-r from-purple-500 to-blue-600"
                        >
                          Add Task
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => setShowNewTaskForm(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full h-12 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    onClick={() => setShowNewTaskForm(column.id)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Task
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanPage;
