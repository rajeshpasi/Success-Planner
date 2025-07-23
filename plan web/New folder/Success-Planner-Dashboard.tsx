// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from 'react';
import * as echarts from 'echarts';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('yearly');
  const [todoTab, setTodoTab] = useState<string>('doing');

  // Sample data for yearly planner
  const months = [
    { name: 'January', progress: 75, highlights: 2 },
    { name: 'February', progress: 90, highlights: 4 },
    { name: 'March', progress: 60, highlights: 3 },
    { name: 'April', progress: 85, highlights: 5 },
    { name: 'May', progress: 40, highlights: 1 },
    { name: 'June', progress: 55, highlights: 2 },
    { name: 'July', progress: 30, highlights: 0 },
    { name: 'August', progress: 20, highlights: 1 },
    { name: 'September', progress: 15, highlights: 0 },
    { name: 'October', progress: 10, highlights: 0 },
    { name: 'November', progress: 5, highlights: 0 },
    { name: 'December', progress: 0, highlights: 0 },
  ];

  // Initialize charts after component mounts
  React.useEffect(() => {
    if (activeTab === 'performance') {
      // Task Completion Bar Chart
      const barChartDom = document.getElementById('task-completion-chart');
      if (barChartDom) {
        const barChart = echarts.init(barChartDom);
        const barOption = {
          animation: false,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: 'Tasks Completed',
              type: 'bar',
              barWidth: '60%',
              data: [10, 14, 9, 12, 15, 8, 6],
              itemStyle: {
                color: '#1976d2'
              }
            }
          ]
        };
        barChart.setOption(barOption);

        // Handle resize
        window.addEventListener('resize', () => {
          barChart.resize();
        });
      }

      // Goal Progress Pie Chart
      const pieChartDom = document.getElementById('goal-progress-chart');
      if (pieChartDom) {
        const pieChart = echarts.init(pieChartDom);
        const pieOption = {
          animation: false,
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'Goal Progress',
              type: 'pie',
              radius: '70%',
              data: [
                { value: 65, name: 'Completed', itemStyle: { color: '#1976d2' } },
                { value: 20, name: 'In Progress', itemStyle: { color: '#f9a825' } },
                { value: 15, name: 'Not Started', itemStyle: { color: '#e0e0e0' } }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        pieChart.setOption(pieOption);

        // Handle resize
        window.addEventListener('resize', () => {
          pieChart.resize();
        });
      }

      // Productivity Trend Line Chart
      const lineChartDom = document.getElementById('productivity-trend-chart');
      if (lineChartDom) {
        const lineChart = echarts.init(lineChartDom);
        const lineOption = {
          animation: false,
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: 'Productivity Score',
              type: 'line',
              data: [65, 78, 68, 82],
              itemStyle: {
                color: '#1976d2'
              },
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'rgba(25, 118, 210, 0.5)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(25, 118, 210, 0.1)'
                    }
                  ]
                }
              }
            }
          ]
        };
        lineChart.setOption(lineOption);

        // Handle resize
        window.addEventListener('resize', () => {
          lineChart.resize();
        });
      }
    }
  }, [activeTab]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-60 bg-white shadow-md flex flex-col h-full">
        <div className="p-5 border-b border-gray-200">
          <h1 className="text-xl font-bold text-[#1976d2] flex items-center">
            <i className="fas fa-check-circle mr-2"></i>
            Success Planner
          </h1>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul>
            {[
              { id: 'yearly', icon: 'fa-calendar-alt', label: 'Yearly Planner' },
              { id: 'monthly', icon: 'fa-calendar-day', label: 'Monthly Planner' },
              { id: 'weekly', icon: 'fa-calendar-week', label: 'Weekly Planner' },
              { id: 'todo', icon: 'fa-tasks', label: 'Todo Section' },
              { id: 'performance', icon: 'fa-chart-line', label: 'Performance Dashboard' }
            ].map(item => (
              <li key={item.id} className="mb-1">
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center w-full px-6 py-3 text-left ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-[#1976d2] border-l-4 border-[#1976d2]'
                      : 'text-gray-700 hover:bg-gray-50'
                  } transition-colors duration-200 cursor-pointer whitespace-nowrap !rounded-button`}
                >
                  <i className={`fas ${item.icon} w-5`}></i>
                  <span className="ml-3">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#1976d2] rounded-full flex items-center justify-center text-white">
              <span className="text-sm">JP</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">John Parker</p>
              <p className="text-xs text-gray-500">Premium Plan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Yearly Planner */}
        {activeTab === 'yearly' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Yearly Planner</h2>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer whitespace-nowrap !rounded-button">
                  <i className="fas fa-download mr-2"></i>
                  Export
                </button>
                <button className="px-4 py-2 bg-[#1976d2] text-white rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 cursor-pointer whitespace-nowrap !rounded-button">
                  <i className="fas fa-plus mr-2"></i>
                  Add Goal
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800">2025 Overview</h3>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">Overall Progress:</span>
                  <div className="w-40 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-[#1976d2] h-2.5 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <span className="ml-2">45%</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <div className="flex items-center">
                    <i className="fas fa-bullseye text-[#1976d2] text-xl"></i>
                    <h4 className="ml-2 text-gray-800 font-medium">Annual Goals</h4>
                  </div>
                  <p className="text-2xl font-bold mt-2">12</p>
                  <p className="text-sm text-gray-600">5 completed</p>
                </div>
                
                <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                  <div className="flex items-center">
                    <i className="fas fa-tasks text-[#f9a825] text-xl"></i>
                    <h4 className="ml-2 text-gray-800 font-medium">Tasks</h4>
                  </div>
                  <p className="text-2xl font-bold mt-2">248</p>
                  <p className="text-sm text-gray-600">142 completed</p>
                </div>
                
                <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                  <div className="flex items-center">
                    <i className="fas fa-trophy text-green-600 text-xl"></i>
                    <h4 className="ml-2 text-gray-800 font-medium">Achievements</h4>
                  </div>
                  <p className="text-2xl font-bold mt-2">18</p>
                  <p className="text-sm text-gray-600">+3 this month</p>
                </div>
                
                <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                  <div className="flex items-center">
                    <i className="fas fa-calendar-check text-purple-600 text-xl"></i>
                    <h4 className="ml-2 text-gray-800 font-medium">Events</h4>
                  </div>
                  <p className="text-2xl font-bold mt-2">36</p>
                  <p className="text-sm text-gray-600">2 upcoming</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {months.map((month, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-800">{month.name}</h3>
                      <div className="relative w-10 h-10">
                        <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="16" fill="none" stroke="#e6e6e6" strokeWidth="2"></circle>
                          <circle 
                            cx="18" 
                            cy="18" 
                            r="16" 
                            fill="none" 
                            stroke="#1976d2" 
                            strokeWidth="2" 
                            strokeDasharray={`${month.progress} ${100 - month.progress}`}
                            strokeDashoffset="25"
                          ></circle>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-700">
                          {month.progress}%
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                        <div key={i} className="py-1">{day}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs">
                      {Array.from({ length: 31 }, (_, i) => (
                        <div 
                          key={i} 
                          className={`py-1 rounded-full ${i % 9 === 0 ? 'bg-blue-100 text-blue-800' : ''}`}
                        >
                          {i + 1 <= 31 ? i + 1 : ''}
                        </div>
                      ))}
                    </div>
                  </div>
                  {month.highlights > 0 && (
                    <div className="px-4 py-2 bg-amber-50 border-t border-amber-100">
                      <div className="flex items-center text-sm text-amber-800">
                        <i className="fas fa-star text-[#f9a825] mr-2"></i>
                        <span>{month.highlights} key highlights</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Monthly Planner */}
        {activeTab === 'monthly' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Monthly Planner</h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center cursor-pointer whitespace-nowrap !rounded-button">
                    April 2025
                    <i className="fas fa-chevron-down ml-2"></i>
                  </button>
                </div>
                <button className="p-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 hover:bg-gray-50 cursor-pointer whitespace-nowrap !rounded-button">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button className="p-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 hover:bg-gray-50 cursor-pointer whitespace-nowrap !rounded-button">
                  <i className="fas fa-chevron-right"></i>
                </button>
                <button className="px-4 py-2 bg-[#1976d2] text-white rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 cursor-pointer whitespace-nowrap !rounded-button">
                  <i className="fas fa-plus mr-2"></i>
                  Add Event
                </button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="grid grid-cols-7 text-center py-3 border-b border-gray-200">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
                      <div key={index} className="text-sm font-medium text-gray-700">{day}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 auto-rows-fr">
                    {Array.from({ length: 35 }, (_, i) => {
                      const day = i - 2; // Offset to start month on the 3rd cell (Wednesday)
                      const isCurrentMonth = day >= 1 && day <= 30;
                      const isToday = day === 25; // April 25th is today
                      
                      return (
                        <div 
                          key={i} 
                          className={`
                            min-h-[100px] p-2 border-b border-r border-gray-200 
                            ${!isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''}
                            ${isToday ? 'bg-blue-50' : ''}
                          `}
                        >
                          <div className="flex justify-between items-start">
                            <span className={`text-sm font-medium ${isToday ? 'bg-[#1976d2] text-white h-6 w-6 rounded-full flex items-center justify-center' : ''}`}>
                              {isCurrentMonth ? day : (day < 1 ? 31 + day : day - 30)}
                            </span>
                            {isCurrentMonth && Math.random() > 0.7 && (
                              <i className="fas fa-ellipsis-h text-gray-400 cursor-pointer"></i>
                            )}
                          </div>
                          
                          {isCurrentMonth && (
                            <div className="mt-2">
                              {Math.random() > 0.7 && (
                                <div className="bg-blue-100 text-blue-800 text-xs p-1 rounded mb-1 truncate">
                                  <i className="fas fa-circle text-[#1976d2] text-xs mr-1"></i>
                                  Team meeting
                                </div>
                              )}
                              
                              {Math.random() > 0.8 && (
                                <div className="bg-amber-100 text-amber-800 text-xs p-1 rounded mb-1 truncate">
                                  <i className="fas fa-circle text-[#f9a825] text-xs mr-1"></i>
                                  Project deadline
                                </div>
                              )}
                              
                              {Math.random() > 0.9 && (
                                <div className="bg-green-100 text-green-800 text-xs p-1 rounded mb-1 truncate">
                                  <i className="fas fa-circle text-green-600 text-xs mr-1"></i>
                                  Client call
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-80">
                <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                  <h3 className="font-medium text-gray-800 mb-3">April Overview</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Tasks</span>
                        <span className="font-medium">24/42</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#1976d2] h-2 rounded-full" style={{ width: '57%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Events</span>
                        <span className="font-medium">8/12</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#f9a825] h-2 rounded-full" style={{ width: '66%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Goals</span>
                        <span className="font-medium">2/5</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-800">Upcoming Events</h3>
                    <button className="text-[#1976d2] text-sm hover:underline cursor-pointer whitespace-nowrap !rounded-button">View all</button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start p-2 hover:bg-gray-50 rounded-lg">
                      <div className="bg-blue-100 text-[#1976d2] h-10 w-10 rounded-lg flex items-center justify-center mr-3">
                        <i className="fas fa-users"></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Team Meeting</p>
                        <p className="text-sm text-gray-600">Today, 2:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start p-2 hover:bg-gray-50 rounded-lg">
                      <div className="bg-amber-100 text-[#f9a825] h-10 w-10 rounded-lg flex items-center justify-center mr-3">
                        <i className="fas fa-file-alt"></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Project Review</p>
                        <p className="text-sm text-gray-600">Apr 26, 10:00 AM</p>
                      </div>
                    </div>
                    <div className="flex items-start p-2 hover:bg-gray-50 rounded-lg">
                      <div className="bg-green-100 text-green-600 h-10 w-10 rounded-lg flex items-center justify-center mr-3">
                        <i className="fas fa-phone-alt"></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Client Call</p>
                        <p className="text-sm text-gray-600">Apr 28, 3:30 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Weekly Planner */}
        {activeTab === 'weekly' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Weekly Planner</h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center cursor-pointer whitespace-nowrap !rounded-button">
                    April 22 - 28, 2025
                    <i className="fas fa-chevron-down ml-2"></i>
                  </button>
                </div>
                <button className="p-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 hover:bg-gray-50 cursor-pointer whitespace-nowrap !rounded-button">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button className="p-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 hover:bg-gray-50 cursor-pointer whitespace-nowrap !rounded-button">
                  <i className="fas fa-chevron-right"></i>
                </button>
                <button className="px-4 py-2 bg-[#1976d2] text-white rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 cursor-pointer whitespace-nowrap !rounded-button">
                  <i className="fas fa-plus mr-2"></i>
                  Add Task
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="grid grid-cols-7 border-b border-gray-200">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => {
                  const date = 22 + index;
                  const isToday = date === 25; // April 25th is today
                  
                  return (
                    <div key={index} className={`p-4 text-center ${isToday ? 'bg-blue-50' : ''}`}>
                      <p className="text-sm text-gray-500">{day}</p>
                      <p className={`text-lg font-medium ${isToday ? 'text-[#1976d2]' : 'text-gray-800'}`}>
                        {isToday ? (
                          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-[#1976d2] text-white">
                            {date}
                          </span>
                        ) : date}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-7 gap-px bg-gray-200">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => {
                  const isToday = index === 3; // Thursday is today
                  
                  return (
                    <div 
                      key={index} 
                      className={`bg-white p-3 min-h-[500px] ${isToday ? 'bg-blue-50' : ''}`}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-gray-500">
                          {Math.floor(Math.random() * 5) + 1} tasks
                        </span>
                        <button className="text-gray-400 hover:text-gray-600 cursor-pointer whitespace-nowrap !rounded-button">
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>

                      <div className="space-y-2">
                        {Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, i) => {
                          const priorities = ['low', 'medium', 'high'];
                          const priority = priorities[Math.floor(Math.random() * priorities.length)];
                          const priorityColors = {
                            low: 'bg-green-100 text-green-800',
                            medium: 'bg-amber-100 text-amber-800',
                            high: 'bg-red-100 text-red-800'
                          };
                          
                          return (
                            <div 
                              key={i} 
                              className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-move"
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="flex items-center mb-2">
                                    <div className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[priority]}`}>
                                      {priority}
                                    </div>
                                    <div className="ml-2 text-xs text-gray-500">
                                      {Math.floor(Math.random() * 12) + 1}:00 {Math.random() > 0.5 ? 'AM' : 'PM'}
                                    </div>
                                  </div>
                                  <p className="text-sm font-medium text-gray-800">
                                    {[
                                      'Complete project proposal',
                                      'Review marketing materials',
                                      'Prepare presentation slides',
                                      'Client meeting preparation',
                                      'Update website content',
                                      'Team sync-up',
                                      'Research competitors'
                                    ][Math.floor(Math.random() * 7)]}
                                  </p>
                                </div>
                                <div className="ml-2">
                                  <button className="text-gray-400 hover:text-gray-600 cursor-pointer whitespace-nowrap !rounded-button">
                                    <i className="fas fa-ellipsis-v"></i>
                                  </button>
                                </div>
                              </div>
                              
                              {Math.random() > 0.7 && (
                                <div className="mt-2 flex items-center">
                                  <div className="flex -space-x-2">
                                    {Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) => (
                                      <div 
                                        key={i}
                                        className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs text-white"
                                      >
                                        {['JP', 'AS', 'RK', 'ML'][Math.floor(Math.random() * 4)]}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Todo Section */}
        {activeTab === 'todo' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Todo Section</h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center cursor-pointer whitespace-nowrap !rounded-button">
                    <i className="fas fa-filter mr-2"></i>
                    Filter
                  </button>
                </div>
                <div className="relative">
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center cursor-pointer whitespace-nowrap !rounded-button">
                    <i className="fas fa-sort mr-2"></i>
                    Sort
                  </button>
                </div>
                <button className="px-4 py-2 bg-[#1976d2] text-white rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 cursor-pointer whitespace-nowrap !rounded-button">
                  <i className="fas fa-plus mr-2"></i>
                  Add Task
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button 
                    onClick={() => setTodoTab('doing')}
                    className={`px-6 py-3 text-sm font-medium ${
                      todoTab === 'doing' 
                        ? 'text-[#1976d2] border-b-2 border-[#1976d2]' 
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
                    } cursor-pointer whitespace-nowrap !rounded-button`}
                  >
                    <i className="fas fa-spinner mr-2"></i>
                    Doing
                    <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">12</span>
                  </button>
                  <button 
                    onClick={() => setTodoTab('done')}
                    className={`px-6 py-3 text-sm font-medium ${
                      todoTab === 'done' 
                        ? 'text-[#1976d2] border-b-2 border-[#1976d2]' 
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
                    } cursor-pointer whitespace-nowrap !rounded-button`}
                  >
                    <i className="fas fa-check-circle mr-2"></i>
                    Done
                    <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">24</span>
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="mb-4">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search tasks..." 
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-search text-gray-400"></i>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {todoTab === 'doing' ? (
                    // Doing tasks
                    Array.from({ length: 12 }, (_, i) => {
                      const priorities = ['low', 'medium', 'high'];
                      const priority = priorities[Math.floor(Math.random() * priorities.length)];
                      const priorityColors = {
                        low: 'bg-green-100 text-green-800',
                        medium: 'bg-amber-100 text-amber-800',
                        high: 'bg-red-100 text-red-800'
                      };
                      const categories = ['Work', 'Personal', 'Health', 'Learning', 'Finance'];
                      const category = categories[Math.floor(Math.random() * categories.length)];
                      const categoryColors = {
                        Work: 'bg-blue-100 text-blue-800',
                        Personal: 'bg-purple-100 text-purple-800',
                        Health: 'bg-green-100 text-green-800',
                        Learning: 'bg-amber-100 text-amber-800',
                        Finance: 'bg-gray-100 text-gray-800'
                      };
                      
                      return (
                        <div 
                          key={i} 
                          className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-start">
                            <div className="h-5 w-5 rounded-md border border-gray-300 flex-shrink-0 mt-0.5 cursor-pointer"></div>
                            <div className="ml-3 flex-1">
                              <div className="flex flex-wrap gap-2 mb-1">
                                <div className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[priority]}`}>
                                  {priority}
                                </div>
                                <div className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[category]}`}>
                                  {category}
                                </div>
                                <div className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-800">
                                  Due: Apr {Math.floor(Math.random() * 10) + 25}
                                </div>
                              </div>
                              <p className="text-sm font-medium text-gray-800">
                                {[
                                  'Complete project proposal for client review',
                                  'Prepare presentation slides for team meeting',
                                  'Research competitor products and create analysis',
                                  'Schedule interviews with potential candidates',
                                  'Update website content with new information',
                                  'Finalize budget for Q2 marketing campaign',
                                  'Review and respond to customer feedback emails',
                                  'Create wireframes for new mobile app features',
                                  'Set up weekly team sync meeting',
                                  'Organize files and documents in shared drive',
                                  'Prepare monthly progress report for stakeholders',
                                  'Update project timeline and milestones'
                                ][i]}
                              </p>
                              {Math.random() > 0.7 && (
                                <div className="mt-2 text-xs text-gray-500">
                                  <i className="fas fa-comment-alt mr-1"></i>
                                  {Math.floor(Math.random() * 5) + 1} comments
                                </div>
                              )}
                            </div>
                            <div className="ml-2 flex-shrink-0">
                              <button className="text-gray-400 hover:text-gray-600 cursor-pointer whitespace-nowrap !rounded-button">
                                <i className="fas fa-ellipsis-v"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    // Done tasks
                    Array.from({ length: 8 }, (_, i) => {
                      const categories = ['Work', 'Personal', 'Health', 'Learning', 'Finance'];
                      const category = categories[Math.floor(Math.random() * categories.length)];
                      const categoryColors = {
                        Work: 'bg-blue-100 text-blue-800',
                        Personal: 'bg-purple-100 text-purple-800',
                        Health: 'bg-green-100 text-green-800',
                        Learning: 'bg-amber-100 text-amber-800',
                        Finance: 'bg-gray-100 text-gray-800'
                      };
                      
                      return (
                        <div 
                          key={i} 
                          className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors bg-gray-50"
                        >
                          <div className="flex items-start">
                            <div className="h-5 w-5 rounded-md flex-shrink-0 mt-0.5 cursor-pointer bg-[#1976d2] text-white flex items-center justify-center">
                              <i className="fas fa-check text-xs"></i>
                            </div>
                            <div className="ml-3 flex-1">
                              <div className="flex flex-wrap gap-2 mb-1">
                                <div className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[category]}`}>
                                  {category}
                                </div>
                                <div className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-800">
                                  Completed: Apr {Math.floor(Math.random() * 10) + 15}
                                </div>
                              </div>
                              <p className="text-sm font-medium text-gray-500 line-through">
                                {[
                                  'Update team on project status',
                                  'Review and approve design mockups',
                                  'Send follow-up emails to clients',
                                  'Schedule social media posts for the week',
                                  'Prepare agenda for weekly team meeting',
                                  'Research new productivity tools',
                                  'Update contact information in CRM',
                                  'Review analytics report and identify trends'
                                ][i]}
                              </p>
                            </div>
                            <div className="ml-2 flex-shrink-0">
                              <button className="text-gray-400 hover:text-gray-600 cursor-pointer whitespace-nowrap !rounded-button">
                                <i className="fas fa-ellipsis-v"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Performance Dashboard */}
        {activeTab === 'performance' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Performance Dashboard</h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center cursor-pointer whitespace-nowrap !rounded-button">
                    Last 30 Days
                    <i className="fas fa-chevron-down ml-2"></i>
                  </button>
                </div>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer whitespace-nowrap !rounded-button">
                  <i className="fas fa-download mr-2"></i>
                  Export
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center">
                  <div className="bg-blue-100 text-[#1976d2] h-12 w-12 rounded-lg flex items-center justify-center mr-4">
                    <i className="fas fa-tasks text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tasks Completed</p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-bold text-gray-800 mr-2">64</p>
                      <p className="text-xs text-green-600">
                        <i className="fas fa-arrow-up mr-1"></i>
                        12%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center">
                  <div className="bg-amber-100 text-[#f9a825] h-12 w-12 rounded-lg flex items-center justify-center mr-4">
                    <i className="fas fa-bullseye text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Goals Progress</p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-bold text-gray-800 mr-2">65%</p>
                      <p className="text-xs text-green-600">
                        <i className="fas fa-arrow-up mr-1"></i>
                        5%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center">
                  <div className="bg-green-100 text-green-600 h-12 w-12 rounded-lg flex items-center justify-center mr-4">
                    <i className="fas fa-chart-line text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Productivity Score</p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-bold text-gray-800 mr-2">82</p>
                      <p className="text-xs text-green-600">
                        <i className="fas fa-arrow-up mr-1"></i>
                        8%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center">
                  <div className="bg-purple-100 text-purple-600 h-12 w-12 rounded-lg flex items-center justify-center mr-4">
                    <i className="fas fa-clock text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Focus Time</p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-bold text-gray-800 mr-2">24h</p>
                      <p className="text-xs text-red-600">
                        <i className="fas fa-arrow-down mr-1"></i>
                        3%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-800">Task Completion</h3>
                  <div className="text-sm text-gray-500">Last 7 days</div>
                </div>
                <div id="task-completion-chart" className="h-80"></div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-800">Goal Progress</h3>
                  <div className="text-sm text-gray-500">Current Quarter</div>
                </div>
                <div id="goal-progress-chart" className="h-80"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-800">Productivity Trend</h3>
                  <div className="text-sm text-gray-500">Last 4 weeks</div>
                </div>
                <div id="productivity-trend-chart" className="h-80"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

