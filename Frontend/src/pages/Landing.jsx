// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from "react";
import * as echarts from "echarts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";



const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const chartDom = document.getElementById("performance-chart");
    if (chartDom) {
      const myChart = echarts.init(chartDom);
      const option = {
        animation: false,
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Focus Time",
            type: "line",
            data: [120, 132, 101, 134, 90, 230, 210],
            smooth: true,
            lineStyle: {
              color: "#6366f1",
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(99, 102, 241, 0.4)",
                  },
                  {
                    offset: 1,
                    color: "rgba(99, 102, 241, 0.1)",
                  },
                ],
              },
            },
          },
          {
            name: "Tasks Completed",
            type: "line",
            data: [220, 182, 191, 234, 290, 330, 310],
            smooth: true,
            lineStyle: {
              color: "#ec4899",
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(236, 72, 153, 0.4)",
                  },
                  {
                    offset: 1,
                    color: "rgba(236, 72, 153, 0.1)",
                  },
                ],
              },
            },
          },
        ],
      };
      myChart.setOption(option);

      const handleResize = () => {
        myChart.resize();
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
        myChart.dispose();
      };
    }
  }, []);

  return (
    <div className="font-['Inter',sans-serif] text-gray-800 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-['Poppins',sans-serif] font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Success Planner
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-2xl font-['Poppins',sans-serif]">
            <a
              href="#features"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#benefits"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Benefits
            </a>
            <a
              href="#testimonials"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Testimonials
            </a>
            
          </nav>

          <Link to="/login" className="hidden md:block bg-transparent border border-indigo-600 text-indigo-600 px-6 py-2 rounded-full hover:bg-indigo-600 hover:text-white transition-colors duration-300 !rounded-button whitespace-nowrap cursor-pointer">
            Login Now
          </Link>

          <button className="md:hidden text-gray-700 focus:outline-none cursor-pointer">
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://readdy.ai/api/search-image?query=Modern%20productivity%20dashboard%20interface%20with%20soft%20pastel%20colors%2C%20light%20mode%20UI%20with%20gradient%20background%2C%20abstract%20shapes%2C%20minimalist%20design%2C%20clean%20workspace%20environment%2C%20digital%20planner%20concept%2C%20professional%20and%20inspiring%20atmosphere&width=1440&height=800&seq=hero-bg&orientation=landscape"
            alt="Background"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/20"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-['Poppins',sans-serif] font-bold leading-tight mb-6">
                Plan Smart. <br />
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Achieve More.
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg">
                The ultimate productivity tool for 2025. Organize your tasks,
                track your progress, and achieve your goals with our intuitive
                planning system.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/login" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 !rounded-button whitespace-nowrap cursor-pointer">
                  Start Planning Now
                </Link>
                <Link to="/register" className="bg-white text-indigo-600 border border-indigo-600 px-8 py-3 rounded-full hover:bg-indigo-50 transition-colors duration-300 !rounded-button whitespace-nowrap cursor-pointer">
                  Regster
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-['Poppins',sans-serif] font-bold mb-4">
              Your Complete Planning System
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Organize your life with our flexible planning views. From yearly
              goals to daily tasks, we've got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Yearly Planner */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              <div className="h-64 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=Modern%20yearly%20planner%20dashboard%20with%20calendar%20view%2C%20goal%20tracking%20sections%2C%20progress%20bars%2C%20clean%20interface%20with%20soft%20blue%20and%20purple%20accents%2C%20white%20background%2C%20minimalist%20design%2C%20organized%20layout%20with%20yearly%20overview&width=600&height=400&seq=yearly-planner&orientation=landscape"
                  alt="Yearly Planner"
                  className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Yearly Overview</h3>
                <p className="text-gray-600">
                  Set annual goals, track major milestones, and maintain the big
                  picture view of your year.
                </p>
              </div>
            </div>

            {/* Monthly Planner */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              <div className="h-64 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=Modern%20monthly%20calendar%20interface%20with%20task%20management%2C%20event%20scheduling%2C%20clean%20design%20with%20soft%20purple%20and%20blue%20accents%2C%20white%20background%2C%20minimalist%20UI%2C%20organized%20monthly%20view%20with%20color-coded%20categories%20and%20progress%20indicators&width=600&height=400&seq=monthly-planner&orientation=landscape"
                  alt="Monthly Planner"
                  className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Monthly Calendar</h3>
                <p className="text-gray-600">
                  Plan your months with our intuitive calendar. Schedule events,
                  set deadlines, and organize your time.
                </p>
              </div>
            </div>

            {/* Weekly Planner */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              <div className="h-64 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=Modern%20weekly%20planner%20interface%20with%20daily%20schedule%2C%20task%20lists%2C%20time%20blocking%20features%2C%20clean%20design%20with%20soft%20purple%20and%20blue%20accents%2C%20white%20background%2C%20minimalist%20UI%2C%20organized%20weekly%20view%20with%20progress%20tracking%20and%20priority%20indicators&width=600&height=400&seq=weekly-planner&orientation=landscape"
                  alt="Weekly Planner"
                  className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Weekly Schedule</h3>
                <p className="text-gray-600">
                  Break down your week into manageable chunks with our detailed
                  weekly planner and task manager.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        id="benefits"
        className="py-20 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-['Poppins',sans-serif] font-bold mb-4">
              Why Choose Success Planner
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our productivity platform is designed to help you achieve more
              with less stress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Benefit 1 */}
            <div className="text-center">
              <div className="mb-6 mx-auto w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-brain text-4xl text-indigo-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Boost Focus</h3>
              <p className="text-gray-600">
                Eliminate distractions and improve concentration with our
                focused planning tools and distraction blockers.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="text-center">
              <div className="mb-6 mx-auto w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-chart-line text-4xl text-purple-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Track Progress</h3>
              <p className="text-gray-600">
                Visualize your productivity with beautiful charts and analytics
                that help you understand your performance.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="text-center">
              <div className="mb-6 mx-auto w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-bullseye text-4xl text-pink-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Achieve Goals</h3>
              <p className="text-gray-600">
                Break down big goals into actionable steps and celebrate your
                progress along the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white text-xl font-['Poppins',sans-serif]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-['Poppins',sans-serif] font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to plan, track, and achieve your goals.
            </p>
          </div>

          {/* Feature 1 - Todo Management */}
          <div className="flex flex-col md:flex-row items-center mb-20">
            <div className="w-full md:w-1/2 md:pr-12 mb-10 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">Smart Todo Management</h3>
              <p className="text-gray-600 mb-6">
                Our intelligent task management system helps you prioritize what
                matters most.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Drag-and-drop task organization</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Priority-based sorting</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Recurring task automation</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Deadline notifications</span>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://readdy.ai/api/search-image?query=Modern%20todo%20management%20interface%20with%20task%20lists%2C%20priority%20indicators%2C%20clean%20design%20with%20soft%20purple%20and%20blue%20accents%2C%20white%20background%2C%20minimalist%20UI%2C%20organized%20layout%20with%20checkboxes%2C%20due%20dates%2C%20and%20category%20tags&width=700&height=500&seq=todo-feature&orientation=landscape"
                  alt="Todo Management"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Feature 2 - Performance Analytics */}
          <div className="flex flex-col md:flex-row-reverse items-center mb-20">
            <div className="w-full md:w-1/2 md:pl-12 mb-10 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">Performance Analytics</h3>
              <p className="text-gray-600 mb-6">
                Gain insights into your productivity patterns with our detailed
                analytics.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Visual productivity trends</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Time allocation analysis</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Goal completion rates</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Personalized improvement suggestions</span>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-xl bg-white p-4">
                <div id="performance-chart" className="w-full h-80"></div>
              </div>
            </div>
          </div>

          {/* Feature 3 - Goal Tracking */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 md:pr-12 mb-10 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">Goal Tracking System</h3>
              <p className="text-gray-600 mb-6">
                Set, track, and achieve your goals with our comprehensive goal
                management system.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>SMART goal framework</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Milestone tracking</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Progress visualization</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Goal achievement celebrations</span>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://readdy.ai/api/search-image?query=Modern%20goal%20tracking%20dashboard%20with%20progress%20bars%2C%20milestone%20markers%2C%20clean%20design%20with%20soft%20purple%20and%20blue%20accents%2C%20white%20background%2C%20minimalist%20UI%2C%20organized%20layout%20with%20achievement%20badges%20and%20completion%20statistics&width=700&height=500&seq=goal-feature&orientation=landscape"
                  alt="Goal Tracking"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
    <section id="testimonials" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-['Poppins',sans-serif] font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their productivity.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{
              clickable: true,
              el: '.swiper-pagination',
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            speed={800}
            className="testimonial-swiper"
          >
            <div className="swiper-pagination"></div>
            
            {/* Testimonial 1 */}
            <SwiperSlide>
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
                <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                    <img
                      src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20young%20female%20entrepreneur%20with%20confident%20expression%2C%20neutral%20background%2C%20business%20casual%20attire%2C%20natural%20lighting%2C%20high%20quality%20portrait&width=200&height=200&seq=testimonial-1&orientation=squarish"
                      alt="Sarah Johnson"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="text-xl font-bold">Sarah Johnson</h4>
                    <p className="text-gray-600">Marketing Director</p>
                    <div className="flex items-center justify-center md:justify-start mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <i key={i} className="fas fa-star text-yellow-400"></i>
                      ))}
                    </div>
                  </div>
                </div>
                <blockquote className="text-gray-700 text-lg italic">
                  "Success Planner has completely transformed how I manage my team's projects. The intuitive interface and powerful analytics have increased our productivity by 35% in just three months. I can't imagine working without it now!"
                </blockquote>
              </div>
            </SwiperSlide>

            {/* Testimonial 2 */}
            <SwiperSlide>
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
                <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                    <img
                      src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20middle-aged%20male%20entrepreneur%20with%20friendly%20smile%2C%20neutral%20background%2C%20business%20casual%20attire%2C%20natural%20lighting%2C%20high%20quality%20portrait&width=200&height=200&seq=testimonial-2&orientation=squarish"
                      alt="David Chen"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="text-xl font-bold">David Chen</h4>
                    <p className="text-gray-600">Startup Founder</p>
                    <div className="flex items-center justify-center md:justify-start mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <i key={i} className="fas fa-star text-yellow-400"></i>
                      ))}
                    </div>
                  </div>
                </div>
                <blockquote className="text-gray-700 text-lg italic">
                  "As a founder juggling multiple responsibilities, Success Planner has been a game-changer. The goal tracking features keep me accountable, and the weekly planning tools help me stay focused on what truly matters for my business growth."
                </blockquote>
              </div>
            </SwiperSlide>

            {/* Testimonial 3 */}
            <SwiperSlide>
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
                <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                    <img
                      src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20young%20graduate%20student%20with%20thoughtful%20expression%2C%20neutral%20background%2C%20casual%20smart%20attire%2C%20natural%20lighting%2C%20high%20quality%20portrait&width=200&height=200&seq=testimonial-3&orientation=squarish"
                      alt="Emily Rodriguez"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="text-xl font-bold">Emily Rodriguez</h4>
                    <p className="text-gray-600">Graduate Student</p>
                    <div className="flex items-center justify-center md:justify-start mt-2">
                      {[...Array(4)].map((_, i) => (
                        <i key={i} className="fas fa-star text-yellow-400"></i>
                      ))}
                      <i className="fas fa-star-half-alt text-yellow-400"></i>
                    </div>
                  </div>
                </div>
                <blockquote className="text-gray-700 text-lg italic">
                  "Success Planner helped me balance my research, coursework, and teaching responsibilities. The visual progress tracking keeps me motivated, and I love how I can plan everything from long-term research goals to daily tasks in one place."
                </blockquote>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-['Poppins',sans-serif] font-bold mb-6">
            Ready to Transform Your Productivity?
          </h2>
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            Join thousands of users who are achieving more with less stress. Try it now!
          </p>
          <Link to="/login" className="bg-white text-indigo-600 px-8 py-3 h-[48px] w-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 !rounded-button whitespace-nowrap cursor-pointer text-lg font-bold">
            Start Now
          </Link>
          <p className="mt-4 text-indigo-200">
            No credit card required.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 font-['Poppins',sans-serif]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                Success Planner
              </h3>
              <p className="mb-4">
                The ultimate productivity tool for students, professionals, and
                entrepreneurs.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <i className="fab fa-facebook text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#benefits"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Benefits
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Testimonials
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#benefits"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    GDPR Compliance
                  </a>
                </li>
              </ul>
            </div>
            {/* Stay Updated*/}
            
            <div>
              <h3 className="text-lg font-bold text-white mb-4">
                Stay Updated
              </h3>
              <p className="mb-4">
                Subscribe to our newsletter for productivity tips and updates.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none border-none h-[38px] w-xl"
                />
                <button className="bg-indigo-600 h-[38px] w-[100px] text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 transition-colors !rounded-button whitespace-nowrap cursor-pointer">
                  Subscribe
                </button>
              </div>
            </div>

          </div>
        </div>
      </footer>

      {/* Copyright */}
      <div className="text-center bg-gray-900 text-gray-400 text-xl py-4">
        &copy; {new Date().getFullYear()} Success Planner. All rights reserved.
      </div>
    </div>
  );
};

export default LandingPage;
