const BASE_URL = 'http://192.168.0.5:1337/api';
const API_KEY = '';   
// Add your API KEY

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${API_KEY}`,
};

const getSlider = async () => {
  try {
    const response = await fetch(`${BASE_URL}/sliders?populate=*`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // console.log("✅ GlobalAPI.getSlider fetched data:", data);
    return data;
  } catch (error) {
    console.error('🔥 Error fetching slider data:', error.message);
    return null;
  }
};
const getVideoCourse = async () => {
  try {
    const response = await fetch(`${BASE_URL}/video-courses?populate=*`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // console.log("✅ GlobalAPI.videoCourse fetched data:", data);
    return data;
  } catch (error) {
    console.error('🔥 Error fetching video course data:', error.message);
    return null;
  }
};
const getCourseList = async (isBasic) => {
  try {
    const response = await fetch(`${BASE_URL}/course-lists?populate=*&filters[isBasic][$eq]=${isBasic}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // console.log("✅ GlobalAPI.CourseList fetched data:", data);
    return data;
  } catch (error) {
    console.error('🔥 Error fetching course list data:', error.message);
    return null;
  }
};

export default{
getSlider,
getVideoCourse,
getCourseList
}
