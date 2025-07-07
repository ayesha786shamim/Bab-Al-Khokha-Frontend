import React, { useState } from 'react';

export default function StylingQuestionnaireForm() {
  const [formData, setFormData] = useState({
    // Basic Info
    firstName: '',
    lastName: '',
    email: '',
    
    // Images
    bodyMeasurementImage: null,
    selfieImage: null,
    
    // Skin Measurements
    bustChest: '',
    waist: '',
    hips: '',
    shoulderWidth: '',
    armLength: '',
    inseam: '',
    
    // Key Preferences
    style: [],
    fit: [],
    colors: [],
    patterns: [],
    necklines: [],
    sleeves: [],
    
    // Body Measurements
    height: '',
    weight: '',
    shoeSize: '',
    
    // Other Measurements
    neckCircumference: '',
    biceps: '',
    forearm: '',
    wrist: '',
    thigh: '',
    calf: '',
    ankle: '',
    
    // Lifestyle Goals
    everyday: '',
    evening: '',
    
    // Body Type Program
    bodyType: '',
    
    // Accessory Preference
    accessories: [],
    accessoryNotes: '',
    
    // Past Preference
    pastStyles: '',
    
    // Hair Color
    hairColor: '',
    
    // Skin Tone
    skinTone: '',
    undertones: [],
    
    // Makeup Preference
    makeupStyle: '',
    makeupStyles: []
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (field, file) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Prepare data for API (convert files to base64 or handle separately)
      const dataToSend = {
        ...formData,
        bodyMeasurementImage: formData.bodyMeasurementImage?.name || null,
        selfieImage: formData.selfieImage?.name || null
      };

      const response = await fetch('http://localhost:5192/api/userpreferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });
      
      if (response.ok) {
        const result = await response.json();
        alert('Preferences saved successfully!');
        console.log('Saved data:', result);
        
        // Optional: Reset form
        // setFormData({...initial state});
      } else {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        alert('Error saving preferences: ' + response.status);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving preferences: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = "w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:border-transparent";
  const checkboxCardStyle = "flex items-center space-x-3 cursor-pointer bg-white p-2 rounded border border-gray-300 hover:bg-gray-100";
  const radioCardStyle = "flex items-center space-x-3 cursor-pointer bg-white p-3 rounded border border-gray-300 hover:bg-gray-100";
  const checkboxStyle = "w-4 h-4 border-gray-400 rounded";
  const radioStyle = "w-4 h-4 border-gray-400";

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white">
      {/* Header Section */}
      <div className="flex items-start justify-center mb-8 space-x-16 flex-wrap">
        
        {/* Full Length Picture Upload */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-28 h-32 bg-gray-100 rounded-lg relative overflow-hidden border-2 border-gray-300 shadow-sm">
            {formData.bodyMeasurementImage ? (
              <img 
                src={URL.createObjectURL(formData.bodyMeasurementImage)} 
                alt="Full Length" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                Full Length
              </div>
            )}
          </div>

          <div className="flex space-x-2 mt-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload('bodyMeasurementImage', e.target.files[0])}
              className="hidden"
              id="bodyImageUpload"
            />
            <label 
              htmlFor="bodyImageUpload" 
              className="px-3 py-1 text-sm rounded text-white cursor-pointer"
              style={{ backgroundColor: '#CC9966' }}
            >
              Full Length Picture
            </label>
          </div>
        </div>

        {/* Head Shot Upload */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-28 h-32 bg-gray-100 rounded-full relative overflow-hidden border-2 border-gray-300 shadow-sm">
            {formData.selfieImage ? (
              <img 
                src={URL.createObjectURL(formData.selfieImage)} 
                alt="Head Shot" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                Head Shot
              </div>
            )}
          </div>

          <div className="flex space-x-2 mt-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload('selfieImage', e.target.files[0])}
              className="hidden"
              id="selfieUpload"
            />
            <label 
              htmlFor="selfieUpload" 
              className="px-3 py-1 text-sm rounded text-white cursor-pointer"
              style={{ backgroundColor: '#CC9966' }}
            >
              Head Shot Picture
            </label>
          </div>
        </div>

      </div>


      <div className="space-y-8">
        {/* Basic Information */}
        <section className="bg-white p-8 rounded-lg border-l-4" style={{borderLeftColor: '#CC9966'}}>
          <h3 className="font-semibold mb-6 text-xl" style={{color: '#CC9966'}}>Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CC9966] placeholder-gray-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CC9966] placeholder-gray-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CC9966] placeholder-gray-500 text-sm"
              />
            </div>
          </div>
        </section>

        {/* Separator Line */}
        <div className="w-full h-px" style={{backgroundColor: '#CC9966'}}></div>

        {/* Skin Measurements */}
        <section className="bg-white p-8 rounded-lg border-l-4" style={{borderLeftColor: '#CC9966'}}>
          <h3 className="font-semibold mb-6 text-xl" style={{color: '#CC9966'}}>Skin Measurements</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Bust/Chest</label>
              <input
                type="text"
                value={formData.bustChest}
                onChange={(e) => handleInputChange('bustChest', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CC9966] placeholder-gray-500 text-sm"
                placeholder="inches"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Waist</label>
              <input
                type="text"
                value={formData.waist}
                onChange={(e) => handleInputChange('waist', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CC9966] placeholder-gray-500 text-sm"
                placeholder="inches"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Hips</label>
              <input
                type="text"
                value={formData.hips}
                onChange={(e) => handleInputChange('hips', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CC9966] placeholder-gray-500 text-sm"
                placeholder="inches"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Shoulder Width</label>
              <input
                type="text"
                value={formData.shoulderWidth}
                onChange={(e) => handleInputChange('shoulderWidth', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CC9966] placeholder-gray-500 text-sm"
                placeholder="inches"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Arm Length</label>
              <input
                type="text"
                value={formData.armLength}
                onChange={(e) => handleInputChange('armLength', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CC9966] placeholder-gray-500 text-sm"
                placeholder="inches"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Inseam</label>
              <input
                type="text"
                value={formData.inseam}
                onChange={(e) => handleInputChange('inseam', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CC9966] placeholder-gray-500 text-sm"
                placeholder="inches"
              />
            </div>
          </div>
        </section>

        {/* Separator Line */}
        <div className="w-full h-px" style={{backgroundColor: '#CC9966'}}></div>

        {/* Key Preferences */}
        <section className="bg-white p-8 rounded-lg border-l-4" style={{borderLeftColor: '#CC9966'}}>
          <h3 className="font-semibold mb-6 text-xl" style={{color: '#CC9966'}}>Key Preferences</h3>
          
          {/* Preferred Style */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-4 text-gray-700">Preferred Style</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Casual', 'Formal', 'Business', 'Bohemian', 'Minimalist', 'Trendy', 'Classic', 'Edgy'].map((style) => (
                <label key={style} className={checkboxCardStyle}>
                  <input
                    type="checkbox"
                    checked={formData.style.includes(style)}
                    onChange={(e) => {
                      const newStyles = e.target.checked
                        ? [...formData.style, style]
                        : formData.style.filter(s => s !== style);
                      handleInputChange('style', newStyles);
                    }}
                    className={checkboxStyle}
                    style={{accentColor: '#CC9966'}}
                  />
                  <span className="text-sm">{style}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Preferred Fit */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-4 text-gray-700">Preferred Fit</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['Loose', 'Fitted', 'Oversized', 'Tailored', 'Relaxed', 'Slim'].map((fit) => (
                <label key={fit} className={checkboxCardStyle}>
                  <input
                    type="checkbox"
                    checked={formData.fit.includes(fit)}
                    onChange={(e) => {
                      const newFits = e.target.checked
                        ? [...formData.fit, fit]
                        : formData.fit.filter(f => f !== fit);
                      handleInputChange('fit', newFits);
                    }}
                    className={checkboxStyle}
                    style={{accentColor: '#CC9966'}}
                  />
                  <span className="text-sm">{fit}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Avoid Colors */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-4 text-gray-700">Avoid Colors</label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Brown', 'Gray', 'Black', 'White', 'Neon'].map((color) => (
                <label key={color} className={checkboxCardStyle}>
                  <input
                    type="checkbox"
                    checked={formData.colors.includes(color)}
                    onChange={(e) => {
                      const newColors = e.target.checked
                        ? [...formData.colors, color]
                        : formData.colors.filter(c => c !== color);
                      handleInputChange('colors', newColors);
                    }}
                    className={checkboxStyle}
                    style={{accentColor: '#CC9966'}}
                  />
                  <span className="text-sm">{color}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Avoid Patterns */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-4 text-gray-700">Avoid Patterns</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Stripes', 'Polka Dots', 'Floral', 'Plaid', 'Animal Print', 'Geometric', 'Abstract', 'Paisley'].map((pattern) => (
                <label key={pattern} className={checkboxCardStyle}>
                  <input
                    type="checkbox"
                    checked={formData.patterns.includes(pattern)}
                    onChange={(e) => {
                      const newPatterns = e.target.checked
                        ? [...formData.patterns, pattern]
                        : formData.patterns.filter(p => p !== pattern);
                      handleInputChange('patterns', newPatterns);
                    }}
                    className={checkboxStyle}
                    style={{accentColor: '#CC9966'}}
                  />
                  <span className="text-sm">{pattern}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Avoid Necklines */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-4 text-gray-700">Avoid Necklines</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['V-Neck', 'Crew Neck', 'Scoop Neck', 'Boat Neck', 'High Neck', 'Off-Shoulder', 'Halter', 'Strapless'].map((neckline) => (
                <label key={neckline} className={checkboxCardStyle}>
                  <input
                    type="checkbox"
                    checked={formData.necklines.includes(neckline)}
                    onChange={(e) => {
                      const newNecklines = e.target.checked
                        ? [...formData.necklines, neckline]
                        : formData.necklines.filter(n => n !== neckline);
                      handleInputChange('necklines', newNecklines);
                    }}
                    className={checkboxStyle}
                    style={{accentColor: '#CC9966'}}
                  />
                  <span className="text-sm">{neckline}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Avoid Sleeves */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-4 text-gray-700">Avoid Sleeves</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Sleeveless', 'Short Sleeve', 'Long Sleeve', '3/4 Sleeve', 'Cap Sleeve', 'Bell Sleeve', 'Puff Sleeve', 'Cold Shoulder'].map((sleeve) => (
                <label key={sleeve} className={checkboxCardStyle}>
                  <input
                    type="checkbox"
                    checked={formData.sleeves.includes(sleeve)}
                    onChange={(e) => {
                      const newSleeves = e.target.checked
                        ? [...formData.sleeves, sleeve]
                        : formData.sleeves.filter(s => s !== sleeve);
                      handleInputChange('sleeves', newSleeves);
                    }}
                    className={checkboxStyle}
                    style={{accentColor: '#CC9966'}}
                  />
                  <span className="text-sm">{sleeve}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Separator Line */}
        <div className="w-full h-px" style={{backgroundColor: '#CC9966'}}></div>

        {/* Body Measurements */}
        <section className="bg-white p-8 rounded-lg border-l-4" style={{borderLeftColor: '#CC9966'}}>
          <h3 className="font-semibold mb-6 text-xl" style={{color: '#CC9966'}}>Body Measurements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Height</label>
              <input
                type="text"
                value={formData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CC9966] placeholder-gray-500 text-sm"
                placeholder="e.g. 5'6&quot;"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Weight</label>
              <input
                type="text"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CC9966] placeholder-gray-500 text-sm"
                placeholder="lbs"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Shoe Size</label>
              <input
                type="text"
                value={formData.shoeSize}
                onChange={(e) => handleInputChange('shoeSize', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CC9966] placeholder-gray-500 text-sm"
                placeholder="US size"
              />
            </div>
          </div>
        </section>

        {/* Separator Line */}
        <div className="w-full h-px" style={{backgroundColor: '#CC9966'}}></div>

        {/* Other Measurements */}
        <section className="bg-white p-8 rounded-lg border-l-4" style={{borderLeftColor: '#CC9966'}}>
          <h3 className="font-semibold mb-6 text-xl" style={{color: '#CC9966'}}>Other Measurements</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { field: 'neckCircumference', label: 'Neck Circumference' },
              { field: 'biceps', label: 'Biceps' },
              { field: 'forearm', label: 'Forearm' },
              { field: 'wrist', label: 'Wrist' },
              { field: 'thigh', label: 'Thigh' },
              { field: 'calf', label: 'Calf' },
              { field: 'ankle', label: 'Ankle' }
            ].map(({ field, label }) => (
              <div key={field}>
                <label className="block text-sm font-medium mb-2 text-gray-700">{label}</label>
                <input
                  type="text"
                  value={formData[field]}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CC9966] placeholder-gray-500 text-sm"
                  placeholder="inches"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Separator Line */}
        <div className="w-full h-px" style={{backgroundColor: '#CC9966'}}></div>

        {/* Lifestyle Goals */}
        <section className="bg-white p-8 rounded-lg border-l-4" style={{borderLeftColor: '#CC9966'}}>
          <h3 className="font-semibold mb-6 text-xl" style={{color: '#CC9966'}}>Lifestyle Goals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Everyday Goals</label>
              <textarea
                value={formData.everyday}
                onChange={(e) => handleInputChange('everyday', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CC9966] placeholder-gray-500 text-sm"
                rows="4"
                placeholder="Describe your everyday style goals..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Evening Goals</label>
              <textarea
                value={formData.evening}
                onChange={(e) => handleInputChange('evening', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CC9966] placeholder-gray-500 text-sm"
                rows="4"
                placeholder="Describe your evening/formal style goals..."
              />
            </div>
          </div>
        </section>

        {/* Separator Line */}
        <div className="w-full h-px" style={{backgroundColor: '#CC9966'}}></div>

        {/* Body Type Program */}
        <section className="bg-white p-8 rounded-lg border-l-4" style={{borderLeftColor: '#CC9966'}}>
          <h3 className="font-semibold mb-6 text-xl" style={{color: '#CC9966'}}>Body Type Program</h3>
          <div>
            <label className="block text-sm font-medium mb-4 text-gray-700">Body Type</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['Pear', 'Apple', 'Hourglass', 'Rectangle', 'Inverted Triangle', 'Athletic'].map((type) => (
                <label key={type} className={radioCardStyle}>
                  <input
                    type="radio"
                    name="bodyType"
                    checked={formData.bodyType === type}
                    onChange={() => handleInputChange('bodyType', type)}
                    className={radioStyle}
                    style={{accentColor: '#CC9966'}}
                  />
                  <span className="text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Separator Line */}
        <div className="w-full h-px" style={{backgroundColor: '#CC9966'}}></div>

        {/* Accessory Preference */}
        <section className="bg-white p-8 rounded-lg border-l-4" style={{borderLeftColor: '#CC9966'}}>
          <h3 className="font-semibold mb-6 text-xl" style={{color: '#CC9966'}}>Accessory Preference</h3>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-4 text-gray-700">Preferred Accessories</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {['Jewelry', 'Scarves', 'Belts', 'Hats', 'Bags', 'Watches', 'Sunglasses', 'Hair Accessories', 'Brooches', 'Gloves'].map((accessory) => (
                <label key={accessory} className={checkboxCardStyle}>
                  <input
                    type="checkbox"
                    checked={formData.accessories.includes(accessory)}
                    onChange={(e) => {
                      const newAccessories = e.target.checked
                        ? [...formData.accessories, accessory]
                        : formData.accessories.filter(a => a !== accessory);
                      handleInputChange('accessories', newAccessories);
                    }}
                    className={checkboxStyle}
                    style={{accentColor: '#CC9966'}}
                  />
                  <span className="text-sm">{accessory}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Additional Notes</label>
            <textarea
              value={formData.accessoryNotes}
              onChange={(e) => handleInputChange('accessoryNotes', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CC9966] placeholder-gray-500 text-sm"
              rows="3"
              placeholder="Any specific accessory preferences or notes..."
            />
          </div>
        </section>

        {/* Separator Line */}
        <div className="w-full h-px" style={{backgroundColor: '#CC9966'}}></div>

        {/* Past Preference */}
        <section className="bg-white p-8 rounded-lg border-l-4" style={{borderLeftColor: '#CC9966'}}>
          <h3 className="font-semibold mb-6 text-xl" style={{color: '#CC9966'}}>Past Preference</h3>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Past Style Experiences</label>
            <textarea
              value={formData.pastStyles}
              onChange={(e) => handleInputChange('pastStyles', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CC9966] placeholder-gray-500 text-sm"
              rows="4"
              placeholder="Tell us about your past style experiences..."
            />
          </div>
        </section>

        {/* Separator Line */}
        <div className="w-full h-px" style={{backgroundColor: '#CC9966'}}></div>

        {/* Hair Color */}
        <section className="bg-white p-8 rounded-lg border-l-4" style={{borderLeftColor: '#CC9966'}}>
          <h3 className="font-semibold mb-6 text-xl" style={{color: '#CC9966'}}>Hair Color</h3>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Current Hair Color</label>
            <input
              type="text"
              value={formData.hairColor}
              onChange={(e) => handleInputChange('hairColor', e.target.value)}
              className={`${inputStyle} md:w-1/2`}
              placeholder="e.g. Brunette, Blonde, Black..."
            />
          </div>
        </section>

        {/* Separator Line */}
        <div className="w-full h-px" style={{backgroundColor: '#CC9966'}}></div>

        {/* Skin Tone */}
        <section className="bg-white p-8 rounded-lg border-l-4" style={{borderLeftColor: '#CC9966'}}>
          <h3 className="font-semibold mb-6 text-xl" style={{color: '#CC9966'}}>Skin Tone</h3>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-4 text-gray-700">Skin Tone</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['Fair', 'Light', 'Medium', 'Olive', 'Tan', 'Deep'].map((tone) => (
                <label key={tone} className={radioCardStyle}>
                  <input
                    type="radio"
                    name="skinTone"
                    checked={formData.skinTone === tone}
                    onChange={() => handleInputChange('skinTone', tone)}
                    className={radioStyle}
                    style={{accentColor: '#CC9966'}}
                  />
                  <span className="text-sm">{tone}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-4 text-gray-700">Undertones</label>
            <div className="grid grid-cols-3 gap-4">
              {['Cool', 'Warm', 'Neutral'].map((undertone) => (
                <label key={undertone} className={radioCardStyle}>
                  <input
                    type="checkbox"
                    checked={formData.undertones.includes(undertone)}
                    onChange={(e) => {
                      const newUndertones = e.target.checked
                        ? [...formData.undertones, undertone]
                        : formData.undertones.filter(u => u !== undertone);
                      handleInputChange('undertones', newUndertones);
                    }}
                    className={checkboxStyle}
                    style={{accentColor: '#CC9966'}}
                  />
                  <span className="text-sm">{undertone}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Separator Line */}
        <div className="w-full h-px" style={{backgroundColor: '#CC9966'}}></div>

        {/* Makeup Preference */}
        <section className="bg-white p-8 rounded-lg border-l-4" style={{borderLeftColor: '#CC9966'}}>
          <h3 className="font-semibold mb-6 text-xl" style={{color: '#CC9966'}}>Makeup Preference</h3>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-4 text-gray-700">Makeup Style</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Natural', 'Glam', 'Bold', 'Minimalist', 'Vintage', 'Smoky', 'Colorful', 'No Makeup'].map((style) => (
                <label key={style} className={checkboxCardStyle}>
                  <input
                    type="checkbox"
                    checked={formData.makeupStyles.includes(style)}
                    onChange={(e) => {
                      const newStyles = e.target.checked
                        ? [...formData.makeupStyles, style]
                        : formData.makeupStyles.filter(s => s !== style);
                      handleInputChange('makeupStyles', newStyles);
                    }}
                    className={checkboxStyle}
                    style={{accentColor: '#CC9966'}}
                  />
                  <span className="text-sm">{style}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Additional Makeup Notes</label>
            <textarea
              value={formData.makeupStyle}
              onChange={(e) => handleInputChange('makeupStyle', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CC9966] placeholder-gray-500 text-sm"
              rows="3"
              placeholder="Describe your makeup preferences and style..."
            />
          </div>
        </section>

        {/* Submit Button */}
        <div className="text-center mt-12">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`text-white font-semibold py-4 px-16 rounded-lg transition-colors duration-200 text-lg ${
              isLoading 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:opacity-90'
            }`}
            style={{backgroundColor: '#CC9966'}}
          >
            {isLoading ? 'Saving...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}