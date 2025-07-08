import React, { useState } from 'react';
import { 
  CreditCard, 
  Zap, 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Copy,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface BillInfo {
  serviceNumber: string;
  accountHolder: string;
  address: string;
  amount: number;
  dueDate: string;
  status: string;
}

export default function PayBillPage() {
  const [serviceNumber, setServiceNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentStep, setPaymentStep] = useState('input'); // input, review, processing, success
  const [billInfo, setBillInfo] = useState<BillInfo | null>(null);
  const [showBulk, setShowBulk] = useState(false);
  const [bulkCount, setBulkCount] = useState(2);
  const [bulkFields, setBulkFields] = useState([{ rpu: '', amount: '' }, { rpu: '', amount: '' }]);
  const [bulkStep, setBulkStep] = useState<'input' | 'review' | 'processing' | 'success'>('input');

  const mockBillInfo = {
    serviceNumber: '123456789012',
    accountHolder: 'María González Pérez',
    address: 'Av. Revolución 123, Col. Centro, CDMX',
    amount: 850.50,
    dueDate: '2025-01-15',
    status: 'Vigente'
  };

  const handleLookupBill = () => {
    if (serviceNumber.length >= 10) {
      // Simulate API call
      setTimeout(() => {
        setBillInfo(mockBillInfo);
        setPaymentStep('review');
      }, 1000);
    }
  };

  const handlePayment = () => {
    setPaymentStep('processing');
    setTimeout(() => {
      setPaymentStep('success');
    }, 3000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Manejar cambio de cantidad de recibos
  const handleBulkCountChange = (count: number) => {
    setBulkCount(count);
    setBulkFields(Array.from({ length: count }, (_, i) => bulkFields[i] || { rpu: '', amount: '' }));
  };

  // Manejar cambio de campos
  const handleBulkFieldChange = (idx: number, field: 'rpu' | 'amount', value: string) => {
    setBulkFields(fields => fields.map((f, i) => i === idx ? { ...f, [field]: field === 'rpu' ? value.replace(/\D/g, '').slice(0, 12) : value.replace(/[^0-9.]/g, '') } : f));
  };

  // Simular pago múltiple
  const handleBulkPay = () => {
    setBulkStep('processing');
    setTimeout(() => setBulkStep('success'), 2500);
  };

  const handleBulkReview = () => {
    setBulkStep('review');
  };

  const handleBulkEdit = () => {
    setBulkStep('input');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            <img src="CFE.jpg" alt="CFE" className="h-5 w-5 mr-2 object-contain" />
            Pago de Recibo CFE
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Paga tu recibo de luz con MXNB
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Procesamiento instantáneo y seguro desde cualquier parte del mundo
          </p>
          
          {/* Logo de CFE prominente */}
          <div className="flex justify-center items-center mt-8 mb-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-4">
                                 <img src="CFE.jpg" alt="CFE" className="h-12 w-auto object-contain" />
                <div className="text-left">
                  <p className="text-lg font-semibold text-gray-900">Comisión Federal de Electricidad</p>
                  <p className="text-sm text-gray-600">Servicio oficial de pagos CFE</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center space-x-2 ${paymentStep === 'input' ? 'text-blue-600' : paymentStep === 'review' || paymentStep === 'processing' || paymentStep === 'success' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentStep === 'input' ? 'bg-blue-100 border-2 border-blue-600' : paymentStep === 'review' || paymentStep === 'processing' || paymentStep === 'success' ? 'bg-green-100 border-2 border-green-600' : 'bg-gray-100 border-2 border-gray-300'}`}>
                {paymentStep === 'review' || paymentStep === 'processing' || paymentStep === 'success' ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <span className="text-sm font-bold">1</span>
                )}
              </div>
              <span className="font-medium">Consultar Recibo</span>
            </div>
            
            <div className={`w-16 h-0.5 ${paymentStep === 'review' || paymentStep === 'processing' || paymentStep === 'success' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            
            <div className={`flex items-center space-x-2 ${paymentStep === 'review' ? 'text-blue-600' : paymentStep === 'processing' || paymentStep === 'success' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentStep === 'review' ? 'bg-blue-100 border-2 border-blue-600' : paymentStep === 'processing' || paymentStep === 'success' ? 'bg-green-100 border-2 border-green-600' : 'bg-gray-100 border-2 border-gray-300'}`}>
                {paymentStep === 'processing' || paymentStep === 'success' ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <span className="text-sm font-bold">2</span>
                )}
              </div>
              <span className="font-medium">Confirmar Pago</span>
            </div>
            
            <div className={`w-16 h-0.5 ${paymentStep === 'success' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            
            <div className={`flex items-center space-x-2 ${paymentStep === 'success' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentStep === 'success' ? 'bg-green-100 border-2 border-green-600' : 'bg-gray-100 border-2 border-gray-300'}`}>
                {paymentStep === 'success' ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <span className="text-sm font-bold">3</span>
                )}
              </div>
              <span className="font-medium">Completado</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Form */}
          <div className="lg:col-span-2">
            {paymentStep === 'input' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Consultar Recibo
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="serviceNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Número de Servicio CFE (RPU)
                    </label>
                    <input
                      type="text"
                      id="serviceNumber"
                      value={serviceNumber}
                      onChange={(e) => {
                        // Solo permitir números y máximo 12 dígitos
                        const value = e.target.value.replace(/\D/g, '').slice(0, 12);
                        setServiceNumber(value);
                      }}
                      placeholder="Ingresa tu número de servicio de 12 dígitos (RPU)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      maxLength={12}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      El número de servicio (RPU) se encuentra en la parte superior de tu recibo CFE y consta de 12 dígitos.
                    </p>
                  </div>
                  
                  <button
                    onClick={handleLookupBill}
                    disabled={serviceNumber.length !== 12}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:transform-none"
                  >
                    Consultar Recibo
                  </button>
                </div>
              </div>
            )}

            {paymentStep === 'review' && billInfo && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Información del Recibo
                    </h2>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {billInfo.status}
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Titular de la cuenta
                      </label>
                      <p className="text-lg font-semibold text-gray-900">{billInfo.accountHolder}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Número de servicio
                      </label>
                      <p className="text-lg font-semibold text-gray-900">{billInfo.serviceNumber}</p>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Dirección
                      </label>
                      <p className="text-lg font-semibold text-gray-900">{billInfo.address}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Fecha de vencimiento
                      </label>
                      <p className="text-lg font-semibold text-gray-900">{billInfo.dueDate}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Monto a pagar
                      </label>
                      <p className="text-3xl font-bold text-gray-900">
                        ${billInfo?.amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Método de Pago
                  </h3>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                        <CreditCard className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">MXNB (Stablecoin)</h4>
                        <p className="text-sm text-gray-600">Equivalente: ~{billInfo?.amount.toFixed(2)} MXNB</p>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>• Comisión: 0.5% (~${(billInfo?.amount! * 0.005).toFixed(2)} MXN)</p>
                      <p>• Procesamiento: Instantáneo</p>
                      <p>• Red: Ethereum</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={handlePayment}
                    className="w-full mt-6 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Proceder al Pago
                  </button>
                </div>
              </div>
            )}

            {paymentStep === 'processing' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
                {/* Logo EnerPay prominente */}
                <div className="mb-8">
                  <img 
                    src="enerpaylogo.jpg" 
                    alt="EnerPay" 
                    className="h-16 w-auto object-contain mx-auto mb-4"
                  />
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <div className="animate-spin">
                      <Zap className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Procesando tu pago...
                </h2>
                
                <p className="text-gray-600 mb-8">
                  EnerPay está enviando tu pago a CFE de forma segura. Esto solo tomará unos segundos.
                </p>
                
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="flex items-center justify-center space-x-2 text-blue-800">
                    <Clock className="h-5 w-5" />
                    <span className="font-medium">Tiempo estimado: 30 segundos</span>
                  </div>
                </div>
              </div>
            )}

            {paymentStep === 'success' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
                {/* Logo EnerPay y éxito */}
                <div className="mb-8">
                  <img 
                    src="enerpaylogo.jpg" 
                    alt="EnerPay" 
                    className="h-20 w-auto object-contain mx-auto mb-4"
                  />
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  ¡Pago exitoso con EnerPay!
                </h2>
                
                <p className="text-gray-600 mb-8">
                  Tu recibo de luz ha sido pagado exitosamente a través de EnerPay. CFE reflejará el pago en unos minutos.
                </p>
                
                <div className="bg-green-50 rounded-xl p-6 mb-6">
                  <div className="text-left space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ID de transacción:</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-sm">0x7a8b9c...def123</span>
                        <button
                          onClick={() => copyToClipboard('0x7a8b9c...def123')}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monto pagado:</span>
                      <span className="font-semibold">${billInfo?.amount.toFixed(2)} MXN</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Comisión:</span>
                      <span className="font-semibold">${(billInfo?.amount! * 0.005).toFixed(2)} MXN</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                    Descaragar Comprobante
                  </button>
                  <button 
                    onClick={() => {
                      setPaymentStep('input');
                      setServiceNumber('');
                      setBillInfo(null);
                    }}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors"
                  >
                    Realizar Otro Pago
                  </button>
                </div>
              </div>
            )}

            {/* Botón para expandir sección de pago múltiple */}
            <div className="flex flex-col gap-2 justify-end mb-4">
              <button
                className="inline-flex items-center px-4 py-2 rounded-lg bg-green-100 text-green-800 font-semibold text-sm hover:bg-green-200 transition-all"
                onClick={() => setShowBulk(v => !v)}
              >
                Pago múltiple de recibos (Empresas)
                {showBulk ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
              </button>

              {/* Carga masiva por Excel (solo Enterprise) */}
              <div className="flex flex-col items-end">
                <button
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-100 text-gray-500 font-semibold text-sm cursor-not-allowed mt-2 border border-dashed border-gray-300"
                  disabled
                  title="Disponible solo para clientes Enterprise"
                >
                  <svg className="h-5 w-5 mr-2 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  Carga masiva por Excel
                  <span className="ml-2 bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded text-xs font-bold">Enterprise</span>
                </button>
                <span className="text-xs text-gray-400 mt-1">Solicita acceso Enterprise para habilitar esta función</span>
              </div>
            </div>

            {/* Sección expandible de pago múltiple */}
            {showBulk && (
              <div className="bg-white rounded-2xl shadow-sm border border-green-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Pago múltiple de recibos</h2>
                {bulkStep === 'input' && (
                  <>
                    <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
                      <label className="font-medium text-gray-700">¿Cuántos recibos quieres pagar?</label>
                      <select
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                        value={bulkCount}
                        onChange={e => handleBulkCountChange(Number(e.target.value))}
                      >
                        {Array.from({ length: 25 }, (_, i) => i + 1).map(n => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {bulkFields.map((field, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                          <label className="block text-sm font-medium text-gray-700 mb-1">RPU #{idx + 1}</label>
                          <input
                            type="text"
                            value={field.rpu}
                            onChange={e => handleBulkFieldChange(idx, 'rpu', e.target.value)}
                            placeholder="Número de servicio de 12 dígitos"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 mb-2"
                            maxLength={12}
                          />
                          <label className="block text-xs font-medium text-gray-500 mb-1">Monto (MXN)</label>
                          <input
                            type="text"
                            value={field.amount}
                            onChange={e => handleBulkFieldChange(idx, 'amount', e.target.value)}
                            placeholder="Monto a pagar"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                        onClick={handleBulkReview}
                        disabled={bulkFields.some(f => f.rpu.length !== 12 || !f.amount)}
                      >
                        Revisar y Confirmar
                      </button>
                    </div>
                  </>
                )}
                {bulkStep === 'review' && (
                  <>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Revisión de recibos</h3>
                    <div className="overflow-x-auto mb-6">
                      <table className="min-w-full text-left border rounded-xl overflow-hidden">
                        <thead>
                          <tr className="bg-green-50">
                            <th className="px-4 py-2 text-sm font-semibold text-gray-700">#</th>
                            <th className="px-4 py-2 text-sm font-semibold text-gray-700">RPU</th>
                            <th className="px-4 py-2 text-sm font-semibold text-gray-700">Monto (MXN)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bulkFields.map((field, idx) => (
                            <tr key={idx} className="border-b last:border-b-0">
                              <td className="px-4 py-2">{idx + 1}</td>
                              <td className="px-4 py-2 font-mono">{field.rpu}</td>
                              <td className="px-4 py-2">${parseFloat(field.amount || '0').toLocaleString('es-MX', { minimumFractionDigits: 2 })}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                        onClick={handleBulkPay}
                      >
                        Confirmar y Pagar Todos
                      </button>
                      <button
                        className="flex-1 border border-gray-300 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:border-green-600 hover:text-green-600 transition-colors"
                        onClick={handleBulkEdit}
                      >
                        Editar Recibos
                      </button>
                    </div>
                  </>
                )}
                {bulkStep === 'processing' && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                      <CreditCard className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Procesando pagos...</h3>
                    <p className="text-gray-600">Estamos procesando todos los recibos. Esto puede tardar unos segundos.</p>
                  </div>
                )}
                {bulkStep === 'success' && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-8 w-8 text-green-700" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-700 mb-2">¡Pagos realizados con éxito!</h3>
                    <div className="overflow-x-auto mb-6">
                      <table className="min-w-full text-left border rounded-xl overflow-hidden">
                        <thead>
                          <tr className="bg-green-50">
                            <th className="px-4 py-2 text-sm font-semibold text-gray-700">#</th>
                            <th className="px-4 py-2 text-sm font-semibold text-gray-700">RPU</th>
                            <th className="px-4 py-2 text-sm font-semibold text-gray-700">Monto (MXN)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bulkFields.map((field, idx) => (
                            <tr key={idx} className="border-b last:border-b-0">
                              <td className="px-4 py-2">{idx + 1}</td>
                              <td className="px-4 py-2 font-mono">{field.rpu}</td>
                              <td className="px-4 py-2">${parseFloat(field.amount || '0').toLocaleString('es-MX', { minimumFractionDigits: 2 })}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-gray-700 mb-6">Todos los recibos han sido pagados correctamente.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        className="flex-1 bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                        onClick={() => { setBulkStep('input'); setBulkFields(Array.from({ length: bulkCount }, () => ({ rpu: '', amount: '' }))); }}
                      >
                        Realizar otro pago múltiple
                      </button>
                      <button
                        className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:border-green-600 hover:text-green-600 transition-colors"
                        onClick={() => setShowBulk(false)}
                      >
                        Volver al inicio
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Info Sidebar */}
          <div className="space-y-6">
            {/* Branding EnerPay */}
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl border border-blue-200 p-6 text-center">
              <img 
                src="enerpaylogo.jpg" 
                alt="EnerPay" 
                className="h-12 w-auto object-contain mx-auto mb-3"
              />
              <h3 className="font-bold text-gray-900 mb-2">Powered by EnerPay</h3>
              <p className="text-sm text-gray-600">
                La plataforma más segura para pagar tu recibo de luz con moneda estable o stablecoins
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">¿Por qué EnerPay?</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Instantáneo</h4>
                    <p className="text-xs text-gray-600">Los pagos se reflejan al momento</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Seguro</h4>
                    <p className="text-xs text-gray-600">Protegido por blockchain</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CreditCard className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Comisión Baja</h4>
                    <p className="text-xs text-gray-600">Solo 0.5% por transacción</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl border border-blue-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                <h3 className="font-bold text-gray-900">Soporte 24/7</h3>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                ¿Tienes dudas? Nuestro equipo está disponible para ayudarte en cualquier momento.
              </p>
              
              <button className="w-full bg-white text-blue-600 py-2 px-4 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors border border-blue-200">
                Contactar Soporte
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}