
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, MoreHorizontal, User, Calendar, MessageSquare, Paperclip } from 'lucide-react';

const KanbanPage = () => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showNewTaskForm, setShowNewTaskForm] = useState<string | null>(null);

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-100 dark:bg-gray-800' },
    { id: 'inprogress', title: 'In Progress', color: 'bg-blue-100 dark:bg-blue-900' },
    { id: 'review', title: 'In Review', color: 'bg-yellow-100 dark:bg-yellow-900' },
    { id: 'done', title: 'Done', color: 'bg-green-100 dark:bg-green-900' }
  ];

  const tasks = [
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
  ];

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
      // In a real app, this would add the task to state/database
      console.log(`Adding task "${newTaskTitle}" to column ${columnId}`);
      setNewTaskTitle('');
      setShowNewTaskForm(null);
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
        <Button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map(column => {
          const columnTasks = getTasksForColumn(column.id);
          
          return (
            <div key={column.id} className="space-y-4">
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
                  <Card key={task.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
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
                        <Button variant="ghost" size="icon" className="h-6 w-6 ml-2">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
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
