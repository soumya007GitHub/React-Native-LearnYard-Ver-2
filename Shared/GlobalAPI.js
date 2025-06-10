const BASE_URL = 'http://192.168.0.2:1337/api';
const API_KEY = '61d1393dd3868abce9bd4a1ca766dd1cfc42687d6c1d713e2a52773e6045128ba37273a6d29cca3bfafb65996e0cf77ab777c6c8bb7389e1ce329603517618b4e6274223622b4a29ac49635f3e2db8bdbe86cecc5c2efdf792bf3245e74c14789f2bfb456b64d75dafefc6aedf188e7ec91b2b8c917f62b1ba3b30e693d087bc';

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